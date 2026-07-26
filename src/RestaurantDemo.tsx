import { useState, type FormEvent } from 'react'
import { CalendarDays, Check, Clock, MapPin, MessageCircle, Search, Users } from 'lucide-react'
import { DemoNotice, DemoToolbar, Modal } from './DemoShared'

const dishes=[
  {name:'Coal-roasted squash',type:'Small plates',price:14,tags:['V','GF'],text:'Cultured cream, chilli oil, toasted seeds'},
  {name:'Wood-fired flatbread',type:'Small plates',price:12,tags:['V'],text:'Whipped feta, burnt honey, garden herbs'},
  {name:'Ember chicken',type:'From the fire',price:29,tags:['GF'],text:'Preserved lemon, spring onion, smoked jus'},
  {name:'Market fish',type:'From the fire',price:32,tags:['GF'],text:'Braised fennel, shellfish butter, charred lime'},
  {name:'Wild mushroom orzo',type:'From the fire',price:24,tags:['V'],text:'Aged cheese, roast garlic, crisp sage'},
  {name:'Dark chocolate torte',type:'Dessert',price:11,tags:['V','GF'],text:'Miso caramel, crème fraîche'},
  {name:'Burnt citrus posset',type:'Dessert',price:10,tags:['V'],text:'Shortbread, bay leaf sugar'},
  {name:'House spritz',type:'Drinks',price:13,tags:[],text:'Blood orange, rosemary, dry vermouth'},
]

export function RestaurantDemo(){
  const[category,setCategory]=useState('All');const[search,setSearch]=useState('');const[reserve,setReserve]=useState(false);const[confirmed,setConfirmed]=useState(false);const[reservation,setReservation]=useState({date:'',time:'19:00',party:'2',name:''})
  const visible=dishes.filter(d=>(category==='All'||d.type===category)&&`${d.name} ${d.text}`.toLowerCase().includes(search.toLowerCase()))
  function book(e:FormEvent){e.preventDefault();setConfirmed(true)}
  return <div className="demo restaurant-demo"><DemoToolbar current="Ember House" projectType="Restaurant Website"/>
    <header className="restaurant-nav"><b>EMBER<br/><i>HOUSE</i></b><nav><a href="#menu">Menu</a><a href="#story">Our table</a><a href="#visit">Visit</a></nav><button onClick={()=>{setReserve(true);setConfirmed(false)}}>Book a table</button></header>
    <main><section className="restaurant-hero"><div><DemoNotice/><span>OPEN FIRE · SHARED TABLES · GOOD COMPANY</span><h1>Gather.<br/><em>Feast.</em><br/>Remember.</h1><p>A neighbourhood dining room shaped by smoke, season and the pleasure of passing plates.</p><button onClick={()=>{setReserve(true);setConfirmed(false)}}>Reserve your table</button></div></section>
      <section className="menu-section" id="menu"><header><div><span>TONIGHT'S MENU</span><h2>Simple ingredients.<br/>A little fire.</h2></div><p>Our menu changes with the market. These dishes are fictional, but the filters work.</p></header><div className="menu-tools"><label><Search/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search the menu"/></label><div>{['All','Small plates','From the fire','Dessert','Drinks'].map(x=><button key={x} className={category===x?'active':''} onClick={()=>setCategory(x)}>{x}</button>)}</div></div><div className="menu-list">{visible.map(d=><article key={d.name}><div><h3>{d.name}</h3><p>{d.text}</p><span>{d.tags.map(t=><i key={t}>{t}</i>)}</span></div><b>${d.price}</b></article>)}</div><small>V · Vegetarian &nbsp;&nbsp; GF · Gluten-free. Please tell the team about allergies.</small></section>
      <section className="restaurant-story" id="story"><div className="story-collage"><span/><span/><span/></div><article><span>OUR TABLE</span><h2>Food tastes better when it’s shared.</h2><p>Ember House is an imagined neighbourhood restaurant with an open hearth at its centre. Menus follow the seasons, plates cross the table, and nobody rushes the last glass.</p><blockquote>“Come for dinner. Stay for the story that follows.”</blockquote></article></section>
      <section className="food-gallery"><div/><div/><div/><div/></section>
      <section className="restaurant-visit" id="visit"><div><MapPin/><span>FIND US</span><h2>14 Willow Lane<br/>Westfield</h2><p>Five minutes from the old market square.</p></div><div><Clock/><span>OPENING HOURS</span><p><b>Tuesday–Thursday</b>5:30pm–10:30pm</p><p><b>Friday–Saturday</b>5:30pm–11:30pm</p><p><b>Sunday–Monday</b>Closed</p></div><div><MessageCircle/><span>ORDER & ENQUIRE</span><p>For group dining or a fictional takeaway order, message the demo restaurant.</p><a href="https://wa.me/15551234567?text=Hi%20Ember%20House%2C%20I%27d%20like%20to%20make%20an%20enquiry">WhatsApp us</a></div></section>
    </main><footer className="restaurant-footer"><b>EMBER HOUSE</b><p>Fictional restaurant concept. No real reservations or orders are accepted.</p></footer>
    {reserve&&<Modal title={confirmed?'Your table is held':'Reserve a table'} onClose={()=>setReserve(false)} className="reservation-modal">{confirmed?<div className="demo-success"><Check/><h3>See you at the table, {reservation.name}.</h3><p>Demo reservation for {reservation.party} on {reservation.date} at {reservation.time}. No real booking was created.</p><button onClick={()=>setReserve(false)}>Done</button></div>:<form className="demo-form" onSubmit={book}><label>Name<input required value={reservation.name} onChange={e=>setReservation({...reservation,name:e.target.value})}/></label><label>Date<div className="input-icon"><CalendarDays/><input type="date" required value={reservation.date} onChange={e=>setReservation({...reservation,date:e.target.value})}/></div></label><div className="form-row"><label>Time<select value={reservation.time} onChange={e=>setReservation({...reservation,time:e.target.value})}><option>18:00</option><option>19:00</option><option>20:00</option><option>21:00</option></select></label><label>Party size<div className="input-icon"><Users/><select value={reservation.party} onChange={e=>setReservation({...reservation,party:e.target.value})}>{[1,2,3,4,5,6,7,8].map(x=><option key={x}>{x}</option>)}</select></div></label></div><label>Email<input type="email" required/></label><button>Confirm demo reservation</button></form>}</Modal>}
  </div>
}
