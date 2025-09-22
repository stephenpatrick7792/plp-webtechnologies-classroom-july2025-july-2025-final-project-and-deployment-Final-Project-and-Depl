 // main.js — mobile menu, year updater, form validation, scroll reveal
 document.addEventListener('DOMContentLoaded', () => {
 // set current year in all footers
 const y = new Date().getFullYear();
 ['year','year-2','year-3','year-4'].forEach(id=>{
 const el = document.getElementById(id); if(el) el.textContent = y;
 });
 // mobile nav toggles (supports multiple pages using IDs nav, nav-2, ...)
 const toggles = document.querySelectorAll('.nav-toggle');
 toggles.forEach(btn => {
 btn.addEventListener('click', () => {
 const nav = btn.nextElementSibling; // expects nav after button in markup
 if (!nav) return;
 nav.classList.toggle('open');
 btn.setAttribute('aria-expanded', nav.classList.contains('open'));
 });

 });
 // simple form validation + simulated submit
 const form = document.getElementById('contact-form');
 if (form){
 form.addEventListener('submit', (e) => {
 e.preventDefault();
 const name = form.name.value.trim();
 const email = form.email.value.trim();
 const msg = form.message.value.trim();
 const resp = document.getElementById('form-response');
 let errors = [];
 if (name.length < 2) errors.push('Please enter your name.');
 if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Please enter a valid email.');
 if (msg.length < 10) errors.push('Message must be at least 10 characters.');
 if (errors.length){
 resp.textContent = errors.join(' ');
 resp.style.color = 'crimson';
 return;
 }
 // Simulate sending: replace with fetch to a serverless function or form endpoint when deploying
 resp.style.color = 'var(--accent)';
 resp.textContent = 'Sending message...';
 setTimeout(()=>{
 resp.textContent = 'Thanks — your message was sent (simulated).';
 form.reset();
 }, 900);
 });
 }
 // scroll reveal for elements with .reveal-on-scroll
 const io = new IntersectionObserver((entries) => {
 entries.forEach(entry => {
 if(entry.isIntersecting){
 entry.target.classList.add('visible');
 io.unobserve(entry.target);
 }
 });
 }, {threshold:0.12});
 document.querySelectorAll('.reveal-onscroll, .reveal').forEach(el=>io.observe(el));
 // keyboard accessible close for nav by Escape

document.addEventListener('keydown', (e) => {
 if(e.key === 'Escape') document.querySelectorAll('.sitenav.open').forEach(nav=>nav.classList.remove('open'));
 });
 });