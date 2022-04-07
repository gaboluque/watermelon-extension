while (!$) {
  console.log("no $");
}
const vscode = acquireVsCodeApi();

const button = document.querySelector('button');

button.addEventListener('click', event => {
  sendMessage({command: "run"});
});

$(document).ready(function () {
  const addPRsToDoc = (prs) => {
    removeLoading();
    prs.forEach((pr) => {
      let mdComments = "";
      pr.comments.forEach((comment) => {mdComments+=`<div class="comment-body">${marked.parse(comment)}</div>`});
      console.log(mdComments);
      $("#ghHolder").append(`
      <details open>
        <summary><a href="${pr.url}" target="_blank">${pr.title}</a></summary>
        <div>
          <div class="comment-owner">
            <p class="comment-poster">
              Author: ${pr.user}
            </p>
            <p class="comment-date">
              ${new Date(pr.created_at)}
            </p>
          </div>
          ${mdComments}
        </div>
      </details>
      `);
    });
  };
  const setLoading = () => {
    $("#ghHolder").append(`
    <p>Loading...</p>
    `);
  };
  const removeLoading = () => {
    $("#ghHolder p").remove();
  };
  window.addEventListener("message", (event) => {
    const message = event.data; // The JSON data our extension sent
    switch (message.command) {
      case "prs":
        addPRsToDoc(message.data);
        break;
      case "loading":
        setLoading();
        break;
    }
  });
});
