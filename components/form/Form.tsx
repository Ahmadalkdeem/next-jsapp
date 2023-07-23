import css from './css.module.scss'
import { useRouter } from 'next/navigation'

function Form(props: { color: string }) {
    let Navigate = useRouter()
    return (
        <>
            {/* <Helmet>
                <title>התחברו לחשבון שלכם | חנות האופנה המובילה באינטרנט</title>
                <meta name="description" content=" התחברו לחשבון שלכם ותוכלו לצפות בהזמנות, לעקוב אחרי המשלוחים שלכם ולנהל את פרטי החשבון שלכם. כנסו עכשיו!" />
                <meta name="keywords" content="התחברות, חשבון, משלוחים, פרטים, חנות, אינטרנט, קניות" />
            </Helmet> */}
            <div className={css.div}>
                <button onClick={() => { Navigate.push('/connection/login') }} className={props.color === 'כניסה' ? `${css.btnActiv}` : `${css.btn2}`}>כניסה</button>
                <button onClick={() => { Navigate.push('/connection/signup') }} className={props.color === 'הרשמה' ? `${css.btnActiv}` : `${css.btn2}`}>הרשמה</button>
            </div>


        </>
    )
}

export default Form

