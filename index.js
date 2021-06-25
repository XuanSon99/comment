function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const post = async () => {
    try {
        let tokens = document.querySelector("#token").value.split("|")
        let post_list = document.querySelector("#post_list").value.split("|")
        let contents = document.querySelector("#content").value.split("|")
        let image = document.querySelector("#image").value

        let notifi = document.querySelector(".notification")
        notifi.style.display = "block"

        for (let token of tokens) {
            for (let item of post_list) {
                message("start", "Bắt đầu comment: " + item)

                content = contents[Math.floor(Math.random() * contents.length)]
                
                axios.post("https://graph.facebook.com/" + item + "/comments", {
                    access_token: token,
                    message: content,
                    attachment_url: image
                }).then((res) => {
                    message("success", "Comment thành công")
                }).catch((error) => {
                    message("error", "Không thành công: " + item)
                })
                let time = 10
                let cowndown = setInterval(() => {
                    time--
                    document.querySelector(".notification span").textContent = time + "s"
                    if (time == 0) {
                        clearInterval(cowndown)
                        document.querySelector(".notification span").textContent = "Ok"
                    }
                }, 1000);
                await sleep(10000)
            }
        }
    } catch (error) {
        if (confirm("Click oki to see the tutorial")) {
            window.open("https://docs.google.com/document/d/1PW91i6qqhUh-b2T6AvBl9CmD21BBNHU4JojPXhFvmt0/edit?usp=sharing")
        }
    }
}

const message = (type, text) => {
    var p = document.createElement("p");
    var content = document.createTextNode(text);
    p.appendChild(content);
    p.classList.add(type)
    var div = document.querySelector(".notification");
    div.appendChild(p);
}

//861527454458605
// EAAAAZAw4FxQIBANPMUs4uRCp2DvkpZB8Bw76Gw1ePjCPiwJnpyDJ3Y4uviLRR29RBmh0NlGbKe5R6tTPcRidfZAweJjnRWCzuP2a6mFfkeLyZADMWMQD3Y6zCHUWYQIEVy26otxDivuTrIuCGdz3nCQgtAFGjR2dIhKw24Ex2nfd2y6t0qPZBJV0lA0WAg2gZD