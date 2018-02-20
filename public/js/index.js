var socket = io();

function scrollToBottom() {
    var message = $("#messages");
    var newMessage = message.children('li:last-child');
    var clientHeight = message.prop('clientHeight');
    var scrollHeight = message.prop('scrollHeight');
    var scrollTop = message.prop('scrollTop');
    var newMsgHeight = newMessage.innerHeight();
    var lastMsgHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMsgHeight + lastMsgHeight + lastMsgHeight >= scrollHeight) {
        message.scrollTop(scrollHeight)
    }
}

socket.on('connect', function () {
    console.log("Connected to server");

    $('#message-form').on('submit', function (e) {
        e.preventDefault();

        socket.emit('clientMsg', {
            from: 'User',
            text: $('[name=message]').val()
        }, function () {
            $('[name=message]').val('');
        })
    })
});

socket.on('disconnect', function () {
    console.log("Disconnected from server");
});

socket.on('serverMsg', function (newMsg) {

    var formattedTime = moment(newMsg.createdAt).format("h:mm a");
    var template = $("#message-template").html();
    var html     = Mustache.render(template, {
        from : newMsg.from,
        text : newMsg.text,
        createdAt: formattedTime
    });
    $("#messages").append(html);
    scrollToBottom();
});

socket.on('serverLocationMsg', function (location) {

    var formattedTime = moment(location.createdAt).format("h:mm a");
    var template = $("#location-message-template").html();
    var html     = Mustache.render(template, {
        from : location.from,
        url : location.url,
        createdAt: formattedTime
    });
    $("#messages").append(html);
    scrollToBottom();
});

$("#send-location").on('click', function () {

    $("#send-location").attr('disabled', 'disabled').text('Sending');

    navigator.geolocation.getCurrentPosition(function (position) {

        $("#send-location").removeAttr('disabled').text('Send Location');

        socket.emit('locationMsg', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
    }, function () {
        $("#send-location").removeAttr('disabled').text('Send Location');
        alert("Unable to fetch geolocation");
    })
});