**RTFM** will help you to "Read The... Flippin' Manual" entry for a highlighted language keyword
by directing your browser to your favourite resource for that language.

Which website you are taken to is determined by the document's current syntax (at bottom right
corner of the editor window) and your preferred resource for that syntax (specified in the
preferences). If no text is selected when RTFM is triggered, you will be prompted to enter a search string.

RTFM includes settings for every syntax recognized by Nova, so even if you're working in
plain-text you could still do a general web search on any string, or set up a Custom URL to search
the API of whatever you might be working on / documenting.

Lastly, if you're (say) working on SQL in a PHP file, you could temporarily switch the document's
syntax to SQL so you can target your RTFM queries to the SQL resources instead of PHP.

*NOTE:* This extension is just a shortcut for performing the searches you might do on these sites
or through search engines. If the search results aren't better when you're doing the same search
on the site itself, this extension can't improve those results. Not all sites are easily searched.

Here's a [30s Video Demo](https://ext.runcode.run/rtfm/readme/RTFM_howto.mp4)
if you prefer to WTFM.

![How to use RTFM in 3 steps](https://ext.runcode.run/rtfm/readme/RTFM_howto.png)

## Usage

RTFM can be used either by:
- right-clicking on a term and choosing the RTFM command from the pop-up menu, OR
- selecting a word and then choosing the menu item **Editor → RTFM** (or assign a hot-key to it!) OR
- Triggering **RTFM** with no text selected to be prompted for a keyword to search for.

### Configuration

To configure the global preferences, open **Extensions → Extension Library...** then select
RTFM's **Preferences** tab.

### Preferences

For each syntax, you can specify to which online resource you would like to send your searches.
Searches that are done "...via Duck Duck Go redirect" use the "I'm feeling Ducky" option to
automatically redirect the search to the first search result. This is *usually* the page you're
looking for, but ymmv.

#### Custom Language Resources

You can also add up to 3 Custom URLs in the "Custom Language Resources" area. URLs should
start with http or https, and should include the %@ token at the location where the search string
should appear. URLs can also include the %$ token where you'd like to specify the document's current
syntax.

If the URL you enter works in your browser (except for replacing %@ and %$ tokens) it should work
in RTFM.

How to create a custom search url for a website is outside the scope of this manual so you'll
need to RTFM about that somewhere else. :-)

#### Why are you using these presets?

Tradeoffs. Some websites (php.net) do best when searched directly, some do better when searched
through a search engine (HTML5Doctor), and some don't seem to support search at all (Vue).

I've tried to provide a decent set of reference sites without overwhelming the menu with choices
for each syntax. (SQL has the most, of course, since SQL isn't just one language.)

The "I'm feeling Ducky" searches through Duck Duck Go are generally great and it's an extremely
fast way to get right to the page you need. And sometimes the search engines reveal better content
than the site itself.

e.g., HTML5Doctor will show you a simple definition for \<figure\> if you search for that term
directly on their site, but using Duck Duck Go you get a longer article on *why* and *when* you
should use \<figure\>.

Others (e.g., Perl) seem to do worse using DDG, so while it's an option, it's not the default. And
some syntaxes are largely symbolic (e.g., Markdown) and it seemed like if anyone needed resources
for these it would be for the content they are writing, not for the syntax of the content.

I am not familiar with every language so the presets chosen may not be ideal. If you find something
better, you can create and assign you own custom URLs to any syntax. (There's only 3 because I'm
hoping that's enough for most people and I didn't want to clutter up the menus.)
