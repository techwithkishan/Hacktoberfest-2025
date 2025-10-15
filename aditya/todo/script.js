
input.value = todo.text;
input.style.padding = '8px';
input.style.fontSize = '15px';
input.style.borderRadius = '8px';
input.style.border = '1px solid var(--glass)';
input.style.width = '100%';


label.appendChild(input);
input.focus();
input.setSelectionRange(input.value.length, input.value.length);


function finish(saveEdit){
if(saveEdit){
const val = input.value.trim();
if(val) todo.text = val;
}
save(); render();
}


input.addEventListener('keydown', (e)=>{
if(e.key === 'Enter') finish(true);
if(e.key === 'Escape') finish(false);
});
input.addEventListener('blur', ()=> finish(true));



function clearCompleted(){
todos = todos.filter(t => !t.completed);
save(); render();
}


function exportJSON(){
const blob = new Blob([JSON.stringify(todos, null, 2)], {type:'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url; a.download = 'todos.json';
document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}


// events
addForm.addEventListener('submit', (e)=>{ e.preventDefault(); addTask(taskInput.value); taskInput.value=''; taskInput.focus(); });


filters.forEach(btn => btn.addEventListener('click', ()=>{
filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false') });
btn.classList.add('active'); btn.setAttribute('aria-selected','true');
filter = btn.dataset.filter; render();
}));


clearCompletedBtn.addEventListener('click', ()=> clearCompleted());
exportBtn.addEventListener('click', ()=> exportJSON());


// keyboard: pressing '/' focuses input
window.addEventListener('keydown', (e)=>{ if(e.key === '/' && document.activeElement !== taskInput){ e.preventDefault(); taskInput.focus(); } });