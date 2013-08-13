/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var index = 1;

function init() {
    var btn_weiter = document.getElementById("btn_weiter");
    btn_weiter.addEventListener("click", fwd, false);
    var btn_delete = document.getElementById("btn_delete");
    btn_delete.addEventListener("click", resetCanvas, false);
    
    myAudio = new Audio('res/audio/wwm_all/publikumsjoker_loop.mp3'); 
    myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
    }, false);
    myAudio.play();
    
    $('.answers td').click(function() {
        $('td[id!=' + $(this).attr('id') + ']').removeClass('selectedQuestion');
        $(this).toggleClass('selectedQuestion');
    });
    
    draw();
}


function fwd() {
    $('.answers td').removeClass('selectedQuestion');
    index++;
    draw();
}

function resetCanvas() {
    $('.answers td').removeClass('selectedQuestion');
    index = 1;
    draw();
}
;

function draw() {
    $.ajax({
        url: 'xml/catalog.xml',
        dataType: 'xml',
        success: function(data) {
            $(data).find('questions Eur_50 question[id="' + index + '"]').each(function() {
                var question = $(this).find('text').text();

                // Array Antworten
                var answers = $(this).find("answer").get();

                // WWM FRAGEN
                $('.question').html(
                        $('<h1 />', {
                    text: question
                })
                        );

                // WWM ANTWORTEN            
                var i = 0;
                $(answers).each(function() {
                    $('.answers table tbody tr td[id=' + i + ']').html($(answers[i]).text());
                    i++;
                });

                $(this).find("answer[solution='true']").each(function() {

                });


            });
        },
        error: function() {
            $('.questions').text('Failed to get questions');
        }
        
        
    });
    
    
}
