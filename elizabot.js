var ElizaBot = require('elizabot');
var VoxClient = require('vox-client');

var client = new VoxClient({
    agentString: 'elizabot',
    nick: 'elizabot'
});

var eliza = new ElizaBot();

client.connect()
  .then(function() {
    client.post({ text: eliza.getInitial() });
    client.createReadStream({ type: 'MESSAGE' })
      .on('data', function(stanza) {
        console.info('%s says %s', stanza.nick, stanza.text)
        if (stanza.nick == client.nick) {
          return;
        }
        var text = stanza.text.replace('@elizabot', '');
        client.post({ text: eliza.transform(text), replyToStanza: stanza });
      });
  });
