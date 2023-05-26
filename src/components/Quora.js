import React from 'react';
import '../CSS/Quora.css'
import Feed from './Feed';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Widget from './Widget';

export default function Quora() {
  return (
    <div className='quora'>
        <Navbar />
        <div className='quora__content'>
            <Sidebar />
            <Feed />
            <Widget />
        </div>
    </div>
  )
}
