const shorturl = document.getElementById('shorturl');
const shorturlDiv = document.querySelector('.shorturl');
const urlform = document.getElementById('urlform');
const copy = document.getElementById('copy')



urlform.addEventListener('submit',async (e)=>{
    e.preventDefault();

    copy.textContent = 'Copy'
    if(urlform.url.value === ""){
      return alert("enter a url")
    }
    const url = urlform.url.value;
    const shortUrl = await fetch("/generateShortURL", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url : url
        })
      })
      .then(response => response.json())
      .then(data => {
        return data.shorturl;
    }).catch(err => {
      console.log(err);
      alert('something went wrong');
      return ""
    });
    if(shortUrl === ""){
      return;
    }
      shorturl.value = `https://url-shortner-urw2.vercel.app/${shortUrl}`;
      shorturlDiv.style.display = "block";
      urlform.style.display = "none";
      return;
})


function copyToClipboard() {
  if(shorturl.value === ""){
    return alert('generate a shorturl first')
  }

  shorturl.select();
  shorturl.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(shorturl.value);
  copy.textContent = 'Copied'
}

function reset(){
  shorturlDiv.style.display = "none";
  urlform.style.display = "block";
}

reset();