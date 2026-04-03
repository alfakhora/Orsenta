import s from './Stats.module.css'
const D=[{n:'12K+',l:'Patients served'},{n:'200+',l:'Certified doctors'},{n:'24/7',l:'Availability'},{n:'98%',l:'Satisfaction'}]
export default function Stats(){return(<div className={s.strip}>{D.map(d=><div key={d.l} className={s.stat}><span className={s.num}>{d.n}</span><span className={s.lbl}>{d.l}</span></div>)}</div>)}
