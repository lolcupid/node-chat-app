var socket = io();

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
    console.log(newMsg);
    var li = $('<li></li>');
    li.text(`${newMsg.from}: ${newMsg.text}`);
    $("#messages").append(li);
});

socket.on('serverLocationMsg', function (location) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${location.from}`);
    a.attr('href', location.url);
    li.append(a);
    $("#messages").append(li);
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