const secret = "***";

const token = "***";

const clientId = "***";

const videoId = '8591514';

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(clientId, secret, token);
let videoPrivacy;

function postNewComment() {
    client.request({
        method: 'GET',
        path: '/videos/' + videoId
    }, function (error, body, status_code, headers) {
        if (error) {
            console.log(error);
        }
        //check if I have permission to comment
        videoPrivacy = body.privacy.comments;
        if (videoPrivacy == "anybody") {
            //comment on a video
            client.request({
                method: 'POST',
                path: '/videos/8591514/comments',
                query: {
                    text: 'Test cooool video'
                },
            }, function (error, body, status_code, headers) {
                if (error) {
                    console.error(status_code);
                }
                console.log(body);
            })
        }
        else console.log("The user is not allowed to comment on this video");
    })
}

//verification for my new comment:
function verifyNewComment() {
    client.request({
        method: 'GET',
        path: '/videos/' + videoId + '/comments'
    }, function (error, body, status_code, headers) {
        if (error) {
            console.log(error);
        }
        let commentsArray = body.data;
        for (let i = 0; i < commentsArray.length; i++) {
            if (commentsArray[i].user.name == "AssignmentFor0505") {
                console.log("A new comment has been added: " + commentsArray[i].text)
            }
        }
    })
}


//likes and views
function getLikesAndViews() {
    client.request({
        method: 'GET',
        path: '/videos/' + videoId
    }, function (error, body, status_code, headers) {
        if (error) {
            console.log(error);
        }
        console.log('The video\'s number of likes is: ' + body.metadata.connections.likes.total);
        console.log('The video\'s number of views is: ' + JSON.stringify(body.stats.plays));
    })
}

postNewComment();
setTimeout(verifyNewComment, 2000);
setTimeout(getLikesAndViews, 4000);

//how To Be Better - Notes:
//README - where to run first? what to install first? what I did.
//why to use loop, whrite comments in the code. be more spesific with what I did.
//use more variables. QA enviourment - test enviourment. text ped in the side, call by key