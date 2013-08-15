/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var index = 0;
var answerPrefix = ['A', 'B', 'C', 'D'];


function init() {
    /* Buttons */
    $('#btn_loesung').click(loesungAnzeigen);
    $('#btn_weiter').click(fwd);
    $('#btn_delete').click(resetCanvas);

    /* Jokers */
    $('#joker_fifty').click(jokerUsed).click(fiftyJoker);
    $('#joker_audience').click(jokerUsed);
    $('#joker_pastor').click(jokerUsed);

    // starts audio on init() 
//    myAudio = new Audio('res/audio/wwm_all/publikumsjoker_loop.mp3');
//    myAudio.addEventListener('ended', function() {
//        this.currentTime = 0;
//        this.play();
//    }, false);
//    myAudio.play();

    // select answer onclick() 
    $('.answer').click(function() {
        $('div[id!=' + $(this).attr('id') + ']').removeClass('selectedAnswer');
        $(this).toggleClass('selectedAnswer');
    });

    draw();
}



function jokerUsed() {
    $(this).toggleClass('usedJoker');
}

/* 
 *  forwards through the questions and remove the highlight 
 */
function fwd() {
    clearSelections();
    if (index <= 14) {
        index++;
        draw();
    }
}

function clearSelections() {
    $('.answer').removeClass('selectedAnswer correctAnswer');

}

/**
 *  switch to the first question with index = 1 and remove the highlight 
 */
function resetCanvas() {
    clearSelections();
    index = 1;
    draw();
}

/*
 * shows the correct answer
 */
function loesungAnzeigen() {
    $.ajax({
        url: 'xml/catalog.xml',
        dataType: 'xml',
        success: function(data) {
            $(data).find('questions question[id="' + index + '"]').each(function() {
                var index = $(this).find("answer[solution='true']").index();
                $(' table tbody tr td div[id=' + index + ']').toggleClass('correctAnswer');
            });
        },
        error: function() {
            $('.questions').text('Failed to get the correct Answer');
        }
    });
}

/** 
 * draw a question and 4 answers out of the catalog.xml
 */
function draw() {
    $.ajax({
        url: 'xml/catalog.xml',
        dataType: 'xml',
        success: function(data) {
            $(data).find('questions question[id="' + index + '"]').each(function() {
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
                    $(' table tbody tr td div[id=' + i + ']').html(answerPrefix[i] + ':&nbsp;&nbsp; ' + $(answers[i]).text());
                    i++;
                });

                // colores actual WWM Prize
                $('.prizeTable ul li[id="' + index + '"]').addClass('highlightActualPrize');

            });
        },
        error: function() {
            $('.questions').text('Failed to get questions');
        }
    });

}


function fiftyJoker() {
    $.ajax({
        url: 'xml/catalog.xml',
        dataType: 'xml',
        success: function(data) {
            $(data).find('questions question[id="' + index + '"]').each(function() {

                // array with all answers
                var answers = $(this).find("answer").get();

                // WWM Answers           
                var i = 0;
                var counter = 0;
                $(answers).each(function() {
                    if($(this).attr('solution') !== 'true' && counter < 2) {
                        $(' table tbody tr td div[id=' + i + ']').html('');
                        counter++;
                    }
                    i++;
                });
            });
        },
        error: function() {
            $('.questions').text('Failed to get the fifty Joker');
        }
    });

}

