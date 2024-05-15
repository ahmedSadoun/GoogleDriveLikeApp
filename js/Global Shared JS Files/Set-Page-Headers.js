// function setMetaTags() {
//   const metaCharset = document.createElement("meta");
//   metaCharset.setAttribute("charset", "UTF-8");

//   const metaViewport = document.createElement("meta");
//   metaViewport.setAttribute("name", "viewport");
//   metaViewport.setAttribute("content", "width=device-width, initial-scale=1.0");

//   document.head.appendChild(metaCharset);
//   document.head.appendChild(metaViewport);
// }

// function setTitle() {
//   const title = document.createElement("title");
//   title.textContent = "Home";
//   document.head.appendChild(title);
// }

function setLinkTags() {
  let links = [
    {
      rel: "stylesheet",
      href: "../CSS/master.css",
    },
    {
      rel: "stylesheet",
      href: "../Assets/bootstrap.min.css",
    },
  ];

  links.forEach((link) => {
    let linkStylesheet = document.createElement("link");
    linkStylesheet.setAttribute("rel", link.rel);
    linkStylesheet.setAttribute("href", link.href);
    document.head.appendChild(linkStylesheet);
  });
}

function setScriptTags() {
  const scripts = [
    "../Assets/jquery.min.js",
    "../Assets/bootstrap.bundle.min.js",
    "../js/Global Shared JS Files/Fetch-Data.js",
    "../js/Global Shared JS Files/Build-Entries-Grid.js",
    "../js/Global Shared JS Files/Action-List.js",
    "../js/Global Shared JS Files/Header-Search-Bar.js",
    "../js/Global Shared JS Files/Router.js",
    "../js/Global Shared JS Files/Search-Actions.js",
    "../js/Global Shared JS Files/Shared-Button-Click-Events.js",
    "../js/Global Shared JS Files/Navigation-Bar-Drawer.js",
  ];

  scripts.forEach((src) => {
    const script = document.createElement("script");
    script.setAttribute("src", src);
    document.head.appendChild(script);
  });
}

function setHeader() {
  setLinkTags();
  setScriptTags();
}
setHeader();
