var imgs=document.getElementById("ul1").children;
var leftbotton=document.getElementById("box-left");
var rightbotton=document.getElementById("box-right");
var botton=document.getElementById("ul2").children;
var index=0;
var dingshiqi;
var currentindex=function(){
    imgs[0].style.cssText="z-index:100";
    botton[0].style.cssText="background-color:crimson;color:#fff"
    for(var i=1;i<imgs.length;i++){
        imgs[i].style.cssText="z-index:0";
        botton[currentindex].style.cssText="background-color:#fff;color:#000"
    }

}
chongqi();
function chongqi(){
    dingshiqi=setInterval(function(){
        currentindex=index;
        index++;
        if(index==imgs.length)index=0;
        imgs[currentindex].style.cssText="z-index:0";
        botton[currentindex].style.cssText="background-color:#fff;color:#000"
        imgs[index].style.cssText="z-index:100";
        botton[index].style.cssText="background-color:crimson;color:#fff"
    },2000);
}
leftbotton.onclick=function(){
    clearInterval(dingshiqi);
    currentindex=index;
    index--;
    if(index<0)index=imgs.length-1;
    imgs[currentindex].style.cssText="z-index:0";
    botton[currentindex].style.cssText="background-color:#fff;color:#000"
    imgs[index].style.cssText="z-index:100";
    botton[index].style.cssText="background-color:crimson;color:#fff"
    chongqi();
}
rightbotton.onclick=function(){
    clearInterval(dingshiqi);
    currentindex=index;
    index++;
    if(index==imgs.length)index=0;
    imgs[currentindex].style.cssText="z-index:0";
    botton[currentindex].style.cssText="background-color:#fff;color:#000"
    imgs[index].style.cssText="z-index:100";
    botton[index].style.cssText="background-color:crimson;color:#fff"
    chongqi();
}
function botton_s(){
    for(let i=0;i<imgs.length;i++){
        botton[i].onclick=function(){
            clearInterval(dingshiqi);
            currentindex=index;
            index=i;
            imgs[currentindex].style.cssText="z-index:0";
            botton[currentindex].style.cssText="background-color:#fff;color:#000"
            imgs[index].style.cssText="z-index:100";
            botton[index].style.cssText="background-color:crimson;color:#fff"
            chongqi();
        }
    }
}
botton_s();
/************************************** */
// 初始化评价数据（可从localStorage加载）
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// 评分星星交互逻辑
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const value = parseInt(star.dataset.value);
        document.getElementById('ratingValue').value = value;
        stars.forEach((s, index) => {
            s.textContent = index < value ? '★' : '☆';
            s.classList.toggle('active', index < value);
        });
    });
});

// 表单提交处理
document.getElementById('reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newReview = {
        name: document.getElementById('userName').value.trim(),
        rating: parseInt(document.getElementById('ratingValue').value),
        content: document.getElementById('reviewContent').value.trim(),
        time: new Date().toLocaleDateString('zh-CN')
    };

    if (!newReview.name || !newReview.content || !newReview.rating) {
        alert('请填写完整信息！');
        return;
    }

    reviews.unshift(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    renderReviews();
    e.target.reset();
    resetStars();
});

// 渲染评价列表
function renderReviews() {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="user-info">
                <div class="user-avatar">${review.name[0]}</div>
                <div>
                    <h3>${review.name}</h3>
                    <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                </div>
            </div>
            <p class="review-content">${review.content}</p>
            <div class="review-time">${review.time}</div>
        </div>
    `).join('');
}

// 重置评分星星
function resetStars() {
    stars.forEach(star => {
        star.textContent = '☆';
        star.classList.remove('active');
    });
    document.getElementById('ratingValue').value = '';
}

// 初始化渲染
renderReviews();
        // 新增弹窗控制逻辑
        const reviewButton = document.getElementById('reviewButton');
        const modal = document.getElementById('reviewModal');
        const closeBtn = document.getElementById('closeModal');

        // 打开弹窗
        reviewButton.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 禁止背景滚动
        });

        // 关闭弹窗
        closeBtn.addEventListener('click', () => closeModal());
        window.addEventListener('click', (e) => {
            if(e.target === modal) closeModal();
        });

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // 修改表单提交处理
        document.getElementById('reviewForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newReview = {
                name: document.getElementById('userName').value.trim(),
                rating: parseInt(document.getElementById('ratingValue').value),
                content: document.getElementById('reviewContent').value.trim(),
                time: new Date().toLocaleDateString('zh-CN')
            };

            if (!newReview.name || !newReview.content || !newReview.rating) {
                alert('请填写完整信息！');
                return;
            }

            reviews.unshift(newReview);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            renderReviews();
            e.target.reset();
            resetStars();
            closeModal(); // 新增关闭弹窗
        });