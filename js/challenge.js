document.addEventListener("DOMContentLoaded", function() {
    init();
});

function init() {
    let count = 0;
    const domCounter = document.querySelector("#counter");
    const likesList = document.querySelector(".likes");

    // start counter
    let intervalId = setInterval(function() {
        domCounter.innerText = count++;
    }, 1000);

    // get buttons
    const buttons = document.querySelectorAll('button');
    const plusBtn = document.querySelector("#plus");
    const minusBtn = document.querySelector("#minus");
    const heartBtn = document.querySelector("#heart");
    const pauseBtn = document.querySelector("#pause");
    const restartBtn = document.querySelector("#restart");

    //get comment form and input
    const commentForm = document.querySelector('#comment-form');
    const commentInput = document.querySelector('#comment-input');
    const commentList = document.querySelector('#list');

    function handleClick(event) {
        const buttonId = event.target.id;
        switch (buttonId) {
            case "plus":
                domCounter.innerText = count++;
                console.log("plusBtn")
                break;
            case "minus":
                domCounter.innerText = count--;
                console.log("minusBtn")
                break;
            case "heart":
                const likedNum = document.querySelector(`li[data-num="${count}"]`);
                if (likedNum) {
                    const likesCount = parseInt(likedNum.getAttribute("data-likes"));
                    likedNum.setAttribute("data-likes", likesCount + 1);
                    likedNum.innerText = `${count} has been liked ${likesCount + 1} times`;
                } else {
                    const newLike = document.createElement("li");
                    newLike.setAttribute("data-num", count);
                    newLike.setAttribute("data-likes", 1);
                    newLike.innerText = `${count-1} has been liked 1 time`;
                    likesList.appendChild(newLike);
                }
                break;
            case "pause":
                if(pauseBtn.innerText === "pause") {
                    clearInterval(intervalId)
                    pauseBtn.innerText = "resume"
        
                    // disable buttons except pauseBtn
                    buttons.forEach(function(btn) {
                        if(btn !== pauseBtn && btn !== restartBtn){
                            btn.disabled = true;
                        }
                    });
                }
                else {
                    intervalId = setInterval(function() {
                        domCounter.innerHTML = count;
                        count++;
                        console.log(count);
                    }, 1000);
                    pauseBtn.innerHTML = "pause"
        
                    // reenable all buttons
                    buttons.forEach(function(btn) {
                        btn.disabled = false;
                    });
                }
                break;
            case "restart":
                count = 0;
                domCounter.innerText = count;
                pauseBtn.innerHTML = "pause"

                clearInterval(intervalId);
                intervalId = setInterval(function() {
                    domCounter.innerText = count++;
                }, 1000);
                buttons.forEach(function(btn) {
                    btn.disabled = false;
                });
                break;
            default:
                console.log("btn click")
                break;
        }
    }

    plusBtn.addEventListener("click", handleClick);
    minusBtn.addEventListener("click", handleClick);
    heartBtn.addEventListener("click", handleClick);
    pauseBtn.addEventListener("click", handleClick);
    restartBtn.addEventListener("click",handleClick);

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const newComment = document.createElement('div');
        
        newComment.innerText = commentInput.value;
        commentList.appendChild(newComment);
        commentInput.value = '';
    });
}