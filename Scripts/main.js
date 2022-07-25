// ============================================================================================== //
// RTFM - An extension for Panic's Nova IDE
// Copyright (c) 2022, Colin Foster
// LICENSE: BSD 3-Clause License
// ============================================================================================== //

exports.activate = function() {
	// Do work when the extension is activated
	nova.commands.register('rtfm.search', handle_search );
}

exports.deactivate = function() {
	// Clean up state before the extension is deactivated
}


// ---------------------------------------------------------------------------------------------- //
/*	handle_search
	
	Entry point when the RTFM command is triggered. Checks to see if the user has text highlighted,
	and if not, prompts for search_text. Based on:
	- the syntax of the current document and
	- the user's preference of search-resource for this syntax
	an appropriate web page is opened to search for the search_text.
*/
// ---------------------------------------------------------------------------------------------- //

function handle_search( editor )
{
	try
	{
		// Retrieve details about the current syntax and its search target.
		// e.g., 'css' returns [id: 'css', name: "CSS", 'resource_name': "Mozilla.org via Duck Duck Go", 'url_template': "https://..."]
		var syntax      = get_syntax_profile( editor.document.syntax );
		var search_text = editor.selectedText.trim();
		
		// If the user didn't have text highlighted in the editor, ask them for a string.
		if( !search_text )
		{
			nova.workspace.showInputPalette(
				_l('_prompt.search_string', syntax['resource_name'] ),
				{'placeholder': _l('_prompt.placeholder', syntax['name'] ) },
				( search_text ) =>
				{
					do_search( syntax['url_template'], syntax['id'], search_text );
				}
			);
			
			return;
		}
		
		do_search( syntax['url_template'], syntax['id'], search_text );
	}
	catch( error )
	{
		rc_log( error );
		nova_notify( _l('_err.error'), error.message );
	}
}


// ---------------------------------------------------------------------------------------------- //
/*	do_search
	
	Passed:
	- the URL template (with %@ and possibly %$ token placeholders),
	- syntax id (e.g., 'javascript', 'html'), and
	- the user's search_text,
	it substitutes the search_text (and maybe syntax) into the URL, then opens the resulting
	search_url in the user's default browser.
*/
// ---------------------------------------------------------------------------------------------- //

function do_search( url_template, syntax_id, search_text )
{
	if( rc_type( search_text ) !== 'string' || !search_text.trim().length )
		return;
	
	// Don't include generic 'syntax' keywords for these types of searches.
	if( ['text','diff','ini','markdown','shell'].indexOf( syntax_id ) >= 0 )
		syntax_id = '';
	
	var search_url = url_template.replace('%@', search_text.trim() )
							.replace('%$', syntax_id );
	
	nova.openURL( encodeURI( search_url ), ( success ) =>
	{
		if( !success )
			throw new Error( _l('_err.open_url_failed') );
	});
}


// ---------------------------------------------------------------------------------------------- //
/*	get_url_template
	
	Returns the URL template for a particular syntax (e.g., javascript) and resource_id (e.g., moz).
	If the user has specified one of the Custom URLs, that text is loaded, otherwise the template
	is loaded from the presets / localization file via lookup_preset_url_template().
*/
// ---------------------------------------------------------------------------------------------- //

function get_url_template( syntax, resource_id )
{
	var url_template = false;
	if( resource_id.slice( 0, 6 ) !== 'custom')
		return lookup_preset_url_template( syntax, resource_id );
	
	// If the user has selected to use their own URL, load it and validate it.
	url_template = nova.config.get('rtfm.' + resource_id + '_resource');
	url_template = validate_url_template( url_template );
	
	if( !url_template )
		throw new Error( _l('_err.invalid_custom_url', syntax ) );
	
	return url_template;
}


// ---------------------------------------------------------------------------------------------- //
/*	validate_url_template
	
	Make sure what we've gotten from the user bears at least a passing resemblance to a valid
	search URL.
*/
// ---------------------------------------------------------------------------------------------- //

function validate_url_template( url )
{
	if( rc_type( url ) !== 'string' || url.length < 16 )
		return false;
	
	url = url.match(/^https?:\/\/[^.\/\s]+\.\S*$/);
	if( url )
		return url[ 0 ];
	
	return false;
}


// ---------------------------------------------------------------------------------------------- //
/*	get_syntax_profile
	
	Given a syntax code from the editor, it returns a structure with the key values the
	extension needs to perform the search and display any dialogs.
	
	e.g., Given 'javascript' it might return:
	{
		'id': 'javascript',
		'name': Javascript',
		'resource_name': "Mozilla.org via Duck Duck Go redirect",
		'url_template': "https://duckduckgo.com/?q=\+site:developer.mozilla.org+%@"
	}
*/
// ---------------------------------------------------------------------------------------------- //

function get_syntax_profile( syntax )
{
	if( !syntax )
		syntax = 'text';
	else if( syntax.slice( 0, 10 ) === 'typescript' )	// All typescript variations are treated the same.
		syntax = 'typescript';
	
	var resource_id = get_resource_id_from_prefs( syntax );
	
	// Check to see if we're mapping from one syntax to another. (e.g., from CoffeeScript to Javascript settings.)
	// Remapping can happen only once (the prefs are set up such that all remaps are 'end points').
	if( resource_id.slice( 0, 4 ) === 'use-' )
	{
		syntax        = resource_id.slice( 4 );	// strip off 'use-' from to get the syntax to use.
		resource_id   = get_resource_id_from_prefs( syntax );
	}
	
	var syntax_name = _l('_syntax.' + syntax );				// e.g., 'javascript' => "Javascript", 'text' => "Plain Text"
	if( resource_id === '-' )
		throw new Error( _l("_err.no_search_resource", syntax_name ) );
	
	var url_template  = get_url_template( syntax, resource_id );
			
	var resource_name = _l('_rsrc_name.' + resource_id );	// e.g., "Mozilla.org via Duck Duck Go redirect"
	if( resource_id === 'custom')
		resource_name += ' (' + url_template.split('/')[ 2 ] + ')';	// Tack on the domain of Custom URL.
	
	var syntax_profile =
	{
		'id': syntax,
		'name': syntax_name,
		'resource_name': resource_name,
		'url_template': url_template
	};
	
	return syntax_profile;
}


// ---------------------------------------------------------------------------------------------- //
/*	lookup_preset_url_template
	
	Returns the search URL template, containing %$ and %@ placeholder tokens for the search terms.
	
	URL templates are localized in strings.json so it's possible to target websites in languages
	other than English, if they support them.
*/
// ---------------------------------------------------------------------------------------------- //

function lookup_preset_url_template( syntax, resource_id )
{	// General searches to Duck Duck Go and Google (not site: target),
	// use _general not their syntax in the key.
	var url_localization_key = ( ['ddg','goog'].indexOf( resource_id ) > -1 )
		? '_url._general.' + resource_id
		: '_url.' + syntax + '.' + resource_id;
	
	url_template = _l( url_localization_key );
	
	// If localization failed / doesn't start http, throw an error.
	if( !url_template || url_template.slice( 0, 4 ) !== 'http')
		throw new Error("Unable to find valid preset url template.\n[" + syntax + "," + resource_id + "]");
	
	return url_template;
}


// ---------------------------------------------------------------------------------------------- //
/*	get_resource_id_from_prefs
*/
// ---------------------------------------------------------------------------------------------- //

function get_resource_id_from_prefs( syntax )
{
	var resource_id = nova.config.get('rtfm.' + syntax + '_resource');
	if( !resource_id )
		throw new Error( _l('_err.cant_load_prefs', syntax ) );
	
	return resource_id;
}


// ---------------------------------------------------------------------------------------------- //
/*	nova_notify
	
	Show a standard notification prompt
*/
// ---------------------------------------------------------------------------------------------- //

function nova_notify( title, body, duration )
{
	var fn        = nova_notify;
	var note_id   = 'rtfm-notify';
	
	if( typeof( duration ) === 'undefined' )
		duration = 8000;
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
	/*	show
	*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
	
	fn.show = function()
	{
		fn.hide();		// Hide any previous notification we posted.
		
		var request     = new NotificationRequest( note_id );
		
		request.title   = _l( title );
		request.body    = _l( body );
		request.actions = [ _l('_prompt.dismiss') ];
		
		nova.notifications.add( request );
		
		if( duration )
			fn[ note_id ] = setTimeout( fn.hide, duration );
	}
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
	/*	hide
	*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//

	fn.hide = function()
	{	// NOTE: fn[ note_id ] may contain a valid 'timeout' id of 0.
		if( typeof( fn[ note_id ] ) === 'undefined' || fn[ note_id ] === false )
			return;
		
		clearTimeout( fn[ note_id ] );
		nova.notifications.cancel( note_id );
		fn[ note_id ] = false;
	}
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
	
	fn.show();
}


// ---------------------------------------------------------------------------------------------- //
/*	_l - Localization

	Takes any number of arguments following the key which are replaced in the requested string.
	The first argument after the key replaces '%@1', the 2nd replaces '%@2', etc.
*/
// ---------------------------------------------------------------------------------------------- //

function _l( key )
{
	var str = nova.localize( key );
	
	// Arguments are replaced in reverse order so we replace %@11 (if it exists) before %@1.
	for( var i = arguments.length - 1; i > 0; i-- )
		str = str.replace('%@'+i, arguments[ i ] );
	
	return str;
}


// ============================================================================================== //
// LIBRARY ITEMS
// ============================================================================================== //

// ---------------------------------------------------------------------------------------------- //
/*	rc_type - v1.0.0 2022-06-21
	
	Does all the types typeof does, plus:
	'null', 'undefined','array', 'error', 'date', 'set', 'map', 'object', and any other class name.
*/
// ---------------------------------------------------------------------------------------------- //

function rc_type( o )
{
	return Object.prototype.toString.call(o).slice( 8, -1 ).toLowerCase();
}


// ---------------------------------------------------------------------------------------------- //
/*	rc_log - v2.1.0 2022-06-23
*/
// ---------------------------------------------------------------------------------------------- //

function rc_log()
{
	rc_log.id++;
	
	var log_type_and_value= function( value, prefix )
	{
		console.log( prefix + rc_type( value ) + " (" + value.toString() + ")");
	};
	
	try{ var caller_name = arguments.callee.caller.name ? arguments.callee.caller.name : 'anon'; }
	catch( e ){ caller_name = 'unknown'; }
	
	console.log( "= " + rc_log.id + " =======================  " + caller_name + "()" );
		
	for( var i = 0; i < arguments.length; i++ )
	{
		var o = arguments[ i ];
		var type = rc_type( o );
		
		if( ['array','object'].indexOf( type ) > -1 )
		{
			var keys = Object.keys( o );
			if( !keys.length )
				log_type_and_value( o, "- " );
			else
			{
				console.log('{');
				keys.forEach( function( key )
				{
					log_type_and_value( o[ key ], '   "' + key + '": ' );
				} );
				console.log('}');
			}
		}
		else if( type === 'error')
			console.log( "X Line " + o.line + ":" + o.column + " " + o.message );
		else
			log_type_and_value( o, "- " );
	}
}
rc_log.id = 0;
dbg = rc_log;

// ---------------------------------------------------------------------------------------------- //
