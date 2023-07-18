const API_KEY="5oaIt2LPL5wdrgndGhyu0i5QdQn0G4yzls-IRLzlJlk"
const search=document.getElementById("search");
const searchBtn=document.getElementById("search-btn");
const showMore=document.getElementById("show-btn");
const container=document.getElementById("container")
const card=document.getElementById("card");
const template=document.getElementById("card-template");


let input="indian nature";
window.addEventListener('load',()=>{
    container.innerHTML="";
    fetchImages(input)
});


let page=1;

async function fetchImages(value){
   
  

const url=`https://api.unsplash.com/search/photos?page=${page}&query=${value}&client_id=${API_KEY}`;
const response=await fetch(url);
const data=await response.json();
const results=data.results;
console.log(results);

createCards(results);
}


function createCards(results){
    if(results.length==0){
        document.getElementById("active").style.display="block";
    }else{
        document.getElementById("active").style.display="none";
    }
  
   results.forEach(result => {
         const cardClone=template.content.cloneNode(true);
        // console.log(cardClone);
          addData(cardClone,result);
          container.appendChild(cardClone);

    
   });
   showMore.style.display="block";

}

function addData(cardClone,result){
  const cardImg=cardClone.getElementById("card-img");
  //console.log(cardImg);
  const cardDesc=cardClone.getElementById("card-desc");
  
  cardDesc.innerHTML=result.alt_description;
 
  cardImg.src=result.urls.regular;

  const imageUrl=result.links.html;
  cardClone.firstElementChild.addEventListener('click',()=>{
    window.open(imageUrl,"blank_")
})


 



}

showMore.addEventListener('click',()=>{
    input=search.value;
    page++;
    fetchImages(input);
    console.log(page);
})

searchBtn.addEventListener('click',()=>{
   
container.innerHTML="";
fetchImages(search.value);

})
search.addEventListener('keypress',(e)=>{
    if(e.key=="Enter"){
    container.innerHTML="";
    
    fetchImages(search.value);
    }
    
    })
    // search.addEventListener('focusout',(e)=>{
    //    search.value="";
        
    //     })




