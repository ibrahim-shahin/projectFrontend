import ax from 'axios'
import { useNavigate } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useState } from 'react'

const translateLanguages = {
  "af": "Afrikaans",
  "sq": "Albanian",
  "am": "Amharic",
  "ar": "Arabic",
  "hy": "Armenian",
  "as": "Assamese",
  "ay": "Aymara",
  "az": "Azerbaijani",
  "bm": "Bambara",
  "eu": "Basque",
  "be": "Belarusian",
  "bn": "Bengali",
  "bh": "Bhojpuri",
  "bs": "Bosnian",
  "bg": "Bulgarian",
  "ca": "Catalan",
  "ceb": "Cebuano",
  "ny": "Chichewa",
  "zh": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  "co": "Corsican",
  "hr": "Croatian",
  "cs": "Czech",
  "da": "Danish",
  "dv": "Dhivehi",
  "doi": "Dogri",
  "nl": "Dutch",
  "en": "English",
  "eo": "Esperanto",
  "et": "Estonian",
  "ee": "Ewe",
  "fil": "Filipino",
  "fi": "Finnish",
  "fr": "French",
  "fy": "Frisian",
  "gl": "Galician",
  "ka": "Georgian",
  "de": "German",
  "el": "Greek",
  "gn": "Guarani",
  "gu": "Gujarati",
  "ht": "Haitian Creole",
  "ha": "Hausa",
  "haw": "Hawaiian",
  "he": "Hebrew",
  "hi": "Hindi",
  "hmn": "Hmong",
  "hu": "Hungarian",
  "is": "Icelandic",
  "ig": "Igbo",
  "ilo": "Ilocano",
  "id": "Indonesian",
  "ga": "Irish",
  "it": "Italian",
  "ja": "Japanese",
  "jv": "Javanese",
  "kn": "Kannada",
  "kk": "Kazakh",
  "km": "Khmer",
  "rw": "Kinyarwanda",
  "kok": "Konkani",
  "ko": "Korean",
  "kri": "Krio",
  "ku": "Kurdish (Kurmanji)",
  "ckb": "Kurdish (Sorani)",
  "ky": "Kyrgyz",
  "lo": "Lao",
  "la": "Latin",
  "lv": "Latvian",
  "ln": "Lingala",
  "lt": "Lithuanian",
  "lg": "Luganda",
  "lb": "Luxembourgish",
  "mk": "Macedonian",
  "mai": "Maithili",
  "mg": "Malagasy",
  "ms": "Malay",
  "ml": "Malayalam",
  "mt": "Maltese",
  "mi": "Maori",
  "mr": "Marathi",
  "mni": "Meiteilon (Manipuri)",
  "lus": "Mizo",
  "mn": "Mongolian",
  "my": "Myanmar (Burmese)",
  "ne": "Nepali",
  "no": "Norwegian",
  "or": "Odia (Oriya)",
  "om": "Oromo",
  "ps": "Pashto",
  "fa": "Persian",
  "pl": "Polish",
  "pt": "Portuguese",
  "pa": "Punjabi",
  "qu": "Quechua",
  "ro": "Romanian",
  "ru": "Russian",
  "sm": "Samoan",
  "sa": "Sanskrit",
  "gd": "Scots Gaelic",
  "nso": "Sepedi",
  "sr": "Serbian",
  "st": "Sesotho",
  "sn": "Shona",
  "sd": "Sindhi",
  "si": "Sinhala",
  "sk": "Slovak",
  "sl": "Slovenian",
  "so": "Somali",
  "es": "Spanish",
  "su": "Sundanese",
  "sw": "Swahili",
  "sv": "Swedish",
  "tg": "Tajik",
  "ta": "Tamil",
  "tt": "Tatar",
  "te": "Telugu",
  "th": "Thai",
  "ti": "Tigrinya",
  "ts": "Tsonga",
  "tr": "Turkish",
  "tk": "Turkmen",
  "tw": "Twi",
  "uk": "Ukrainian",
  "ur": "Urdu",
  "ug": "Uyghur",
  "uz": "Uzbek",
  "vi": "Vietnamese",
  "cy": "Welsh",
  "xh": "Xhosa",
  "yi": "Yiddish",
  "yo": "Yoruba",
  "zu": "Zulu",
};

const ProjectDetails = ({ project, show, setShow }) => {
  const [error, setError] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (!user) {
      return
    }
    await ax.delete(`https://backend-nm3q.onrender.com/api/projects/${project._id}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    setShow(!show)
  }

  return (
    <>
      <tr>
          <td>{project.title}</td>
          <td>{project.duration.split(',')[0]}</td>
          <td>{formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</td>
          <td>{translateLanguages[project.Language]}</td>
          <td>{project.status} </td>
          <td><button onClick={()=>navigate(`/${project._id}`)} className='btn btn-primary'>Edit</button></td>
          <td><button onClick={()=>handleDelete()} className='btn btn-danger'>Delete</button></td>
      </tr>
    </>
  )
}

export default ProjectDetails