function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const post = async () => {
    try {
        let tokens = document.querySelector("#token").value.split("|")
        let group_list = document.querySelector("#group_list").value
        let contents = document.querySelector("#content").value.split("|")
        let image = document.querySelector("#image").value
        let time = document.querySelector("#time").value

        let notifi = document.querySelector(".notification")
        notifi.style.display = "block"

        let posts = await axios.get("https://graph.facebook.com/" + group_list + "/feed", {
            params: {
                access_token: document.querySelector("#token").value,
                limit: 3
            }
        }).then((res) => {
            message("success", "Lấy ID 5 bài viết đầu thành công")
            return res.data.data
        }).catch((error) => {
            message("error", "Lấy ID bài viết thất bại")
        })

        let post_list = []
        for (let item of posts) {
            post_list.push(item.id.split("_")[1])
        }

        await sleep(1000)

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
                let time = time
                let cowndown = setInterval(() => {
                    time--
                    document.querySelector(".notification span").textContent = time + "s"
                    if (time == 0) {
                        clearInterval(cowndown)
                        document.querySelector(".notification span").textContent = "Ok"
                    }
                }, 1000);
                await sleep(time*1000)
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

const getFeed = () => {
    axios.get("https://graph.facebook.com/" + 861527454458605 + "/feed", {
        params: {
            access_token: document.querySelector("#token").value,
            limit: 5
        }
    }).then((res) => {
        return res.data.data
        // for (let item of res.data.data) {
        //     posts.push(item.id.split("_")[1])
        // }
    }).catch((error) => {
        message("error", "Lấy ID bài viết thất bại")
    })
}
