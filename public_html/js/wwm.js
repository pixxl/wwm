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

    // starts audio on init() 
    myAudio = new Audio('res/audio/wwm_all/publikumsjoker_loop.mp3');
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    myAudio.play();

    // select answer onclick() 
    $('.answers td').click(function() {
        $('div[id!=' + $(this).attr('id') + ']').removeClass('selectedQuestion');
        $(this).toggleClass('selectedQuestion');
    });

    // draw() the first question 
    draw();
}


/* 
 * forwards through the questions and remove the highlight 
 */
function fwd() {
    $('.answers td').removeClass('selectedQuestion');
    index++;
    draw();
}

/**
 *  switch to the first question with index = 1 and remove the highlight 
 */
function resetCanvas() {
    $('.answers td').removeClass('selectedQuestion');
    index = 1;
    draw();
}
;

/** 
 * draw a question and 4 answers out of the catalog.xml
 */
function draw() {
    $.ajax({
        url: 'xml/catalog.xml',
        dataType: 'xml',
        success: function(data) {
            $(data).find('questions Eur_50 question[id="' + index + '"]').each(function() {
                var question = $(this).find('text').text();

                // array with all answers
                var answers = $(this).find("answer").get();

                // WWM Question
                $('.question').html(
                        $('<h1 />', {
                    text: question
                })
                        );

                // WWM Answers           
                var i = 0;
                $(answers).each(function() {
                    $('.answers table tbody tr td div[id=' + i + ']').html($(answers[i]).text());
                    i++;
                });

                // Prüft ob Antwort richtig
                var i = 0;
                $(answers).find('.answers table tbody tr td div[id=' + i + ']').each("answer[solution='true']", function() {
                    alert("richtig");
                }) ;
                
                
                
//                $(this).find("answer[solution='true']").each(function() {                    
//                });


            });
        },
        error: function() {
            $('.questions').text('Failed to get questions');
        }


    });


}
