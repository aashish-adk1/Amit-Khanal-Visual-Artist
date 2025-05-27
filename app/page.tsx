import React from 'react'
import Home from './components/home';
import About from './components/about';
import Gallery from './components/gallery';
import ContactSection from './components/contact';

export default function page() {
  return (
    <>
    <Home/>
    <About/>
    <Gallery/>
    <ContactSection/>
    </>
  )
}
