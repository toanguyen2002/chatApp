
import React from 'react'

function WordArea() {
    return (
        <div className='word-area-container'>
            <p className='word-area-name-app'>CHÀO MỪNG ĐẾN VỚI ZALO PC</p>
            <p className='word-area-content'>Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng</p>
            <p className='word-area-content'>người thân, bạn bè được tối ưu hóa cho máy tính của bạn</p>
            <div id="slideshow">
                <div class="slide-container">
                    <section><img className='slide-img' src="https://res.cloudinary.com/dhyt592i7/image/upload/v1709905546/fgupqdntogv2amuxzqxx.png" alt="" /></section>
                    <section><img className='slide-img' src="https://res.cloudinary.com/dhyt592i7/image/upload/v1714879540/aufys1mpizxgi8ux95ky.png" alt="" /></section>
                    <section><img className='slide-img' src="https://res.cloudinary.com/dhyt592i7/image/upload/v1714879544/n4jpkslyw52ycvv2azmk.png" alt="" /></section> 
                </div>
            </div>
            <p className='word-area-content2'>Đồng Hành Cùng Cộng Đồng, Đơn Giản, Dễ Sử Dụng</p>
        </div>
    )
}


export default WordArea