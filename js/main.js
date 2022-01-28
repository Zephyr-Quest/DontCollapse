let id = 1;
$().on('scroll', function(e) {
    //e.preventDefault();
    id += 20;
    console.log(id);

    $('.progress').width(id);
    if (id >= 400) {
        id = 1
    }
});

