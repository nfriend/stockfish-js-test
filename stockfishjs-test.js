var engine = new Worker('stockfish.js');
var $output = $('#output');

var scrollToBottom = function () {
    $output.stop();
    $output.animate({
        scrollTop: $output.prop('scrollHeight')
    }, 100);
};

engine.onmessage = function (event) {
    $output.append(event.data + '\n');
    scrollToBottom();
};

$('#input').keydown(function (ev) {
    var $this = $(this);
    if (ev.which === 13) {
        var val = $this.val();
        $output.append('<span class="input-code">' + val + '</span><br />');
        engine.postMessage(val);
        $this.val('');
        scrollToBottom();
    }
});
