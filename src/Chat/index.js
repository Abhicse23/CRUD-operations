import React, { useState } from "react"
import logo from './logo.png';
import { toHaveAccessibleErrorMessage } from "@testing-library/jest-dom/dist/matchers";


const examples=[
    'Suggest fun activities',
    'Recommend a dish',
    'Explain superconductors',
    'Balancing chemical equation',
]
const Chat=()=>{

    // const bot=[
    //      {
    //         role:'user',
    //         message:'how are you'
    //      },
    //      {
    //         role:'assistant',
    //         message:'fine' 
    //      }
    // ]
 
    const[bot,setChat]=useState([]);
    const[Input,setInput]=useState('');
     
    const handleSend=async()=>{   
    if(Input.trim()){
        setChat([...bot,{role:'user',message:Input}]);
        setInput('');
        const response=await fetch('https://hackhive-justcoders.onrender.com/api/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                    ...bot,
                    email:Input,
                    password: '123456'
            })
        });
        const resData=await response.json();
        {console.log(resData?.user?.username)}
        {console.log(resData,'resData.username')}
        const data=resData?.message;                   
        setChat([...bot,{role:'user',message:Input},{role:'assistant',message:data}]);
        }
    }
   
    return(
        <div className='h-screen w-screen flex bg-[#20948B] '>
                 <div className='h-screen w-[20%] bg-[#31473A] text-[#fff]  p-4'>
         <div>
    <button className='w-full h-[50px] text-[#ffff] border rounded p-4 hover:bg-slate-600'>+New Chat</button>
 </div> 
 <div className='h-[70%] overflow-scroll shadow-lg hide-scroll-bar'>
    {
        [1,2,3,4,5,,6,7,8,9,2,4,5].map((item,index)=>(
            <div className='py-3 text-center mt-4 text-lg font-light text-[#fff] flex justify-center item-center px-8 hover:bg-slate-600 cursor-pointer'>
            <span className='mr-4'>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-accessible"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1" /><circle cx="12" cy="7.5" r=".5" fill="currentColor" /></svg>
            </span>
            My chat history
        </div>
        ))
    }
 </div>
  <div className=' overflow-scroll shadow-lg hide-scroll-bar h-[20%] border-t-3'>
    {
        [1,2].map((item,index)=>(
            <div className='py-3 text-center mt-4 text-lg font-light text-[#fff] flex justify-center item-center px-8 hover:bg-slate-600 cursor-pointer'>
            <span className='mr-4'>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-accessible"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1" /><circle cx="12" cy="7.5" r=".5" fill="currentColor" /></svg>
            </span>
            MY profile
        </div>
        ))
    }
    
    </div>
         </div>
        <div className='w-[80%]'>
           
        {bot.length>0?
         (  
            <div className='w-[80%] h-[80%] overflow-scroll mx-auto hide-scroll-bar pt-8'>
                {
                    bot.map((item,index)=>(
                        <div className={`w-[80%] mx-auto p-6 pt-4 text-[#fff] flex rounded ${item.role==='assistant'&&`bg-slate-800`}`}>
                            <span className='mr-8 p-2 bg-slate-500 rounded-full h-full'>
                                {
                                    item.role==='user'?
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                    :
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-robot"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M12 2v2" /><path d="M9 12v9" /><path d="M15 12v9" /><path d="M5 16l4 -2" /><path d="M15 14l4 2" /><path d="M9 18h6" /><path d="M10 8v.01" /><path d="M14 8v.01" /></svg>                                 
                                }
                            </span>
                            <div className='leading-loose text-[#fff]'>{item.message}</div>
                        </div>
                    ))
                }
            </div>
         )
           
           :
          (
            <div className='h-[80%] flex flex-col justify-center items-center text-[#fff]'>
            <div><img src={logo} className="App-logo" alt="logo" /></div>

            <div className='text-4xl font-bold mb-8'>Chatbot</div>
            <div className='flex flex-wrap justify-between around max-w-[900px]'>
            {
               examples.map((item,index)=>(
                <div className='text-lg font-light mt-4 p-4 flex border min-w-[400px] rounded cursor-pointer hover:bg-slate-800'onClick={()=>setInput(item)}>{item}</div>
               )) 
            }
            </div>
            </div>
        )}
                
                {/*
                 */}
                   
                <div className='h-[20%]'>
  <div className="flex flex-col items-center w-full h-full justify-center text-[#fff]">
    <div className="relative w-[70%] flex justify-center">
        <input type='text'  className='w-full rounded-lg p-4 bg-slate-800 text-[#fff] pr-16 ' onChange={(e)=>setInput(e.target.value)} value={Input} placeholder="Type your message here...."/>
        <span className="absolute right-4 top-4 cursor-pointer" onClick={()=>Input.trim()?handleSend():undefined}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-send"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
        </span>
      </div>
   <small text-slate-500 mt-2></small>
   <small style={{ color: '#FFFFFF' }}>Chatbot can make mistakes</small>
  </div>
</div>
        </div>
    </div>
    )
}

export default Chat