/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var index = 0;

function init() {
    var btn_weiter = document.getElementById("btn_weiter");
    btn_weiter.addEventListener("click", fwd, false);
    var btn_delete = document.getElementById("btn_delete");
    btn_delete.addEventListener("click", resetCanvas, false);
}

function fwd() {
    resetCanvas();
    index++;
    draw();
}

function draw() {
    $.ajax({
        url: 'xml/catalog.xml',
        dataType: 'xml',
        success: function(data) {
            $(data).find('questions Eur_100 question[id="' + index + '"]').each(function() {
                var question = $(this).find('text').text();
                var id = $(this).attr('id');

                $(this).find("answer[solution='true']").each(function() {
                    //console.log($(this).text());
                });

                // Array
                var answers = $(this).find("answer").get();

                // Ausgabe Array
                $(answers).each((function() {
                    //console.log($(this).text());
                }));

                $('.questions ul').append(
                        $('<li />', {
                    text: '(ID: ' + id + ') ' + question
                })
                        );

                // Ausgabe Array Browser
                $(answers).each((function() {
                    $('.questions ul').append(
                            $('<li />', {
                        text: $(this).text()
                    })
                            );
                }));
            });
        },
        error: function() {
            $('.questions').text('Failed to get questions');
        }
    });
}

function resetCanvas() {
    $('.questions ul li').remove()
};