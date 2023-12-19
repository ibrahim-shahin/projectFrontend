import { useRef, useState } from "react"
import ax from 'axios'
import { useNavigate } from "react-router-dom"
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

const ProjectForm = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [model, setModel] = useState('tiny')
  const [translang, setTrans] = useState('en')
  const [link, setLink] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const inputFileRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("model", model);
    formData.append("translang", translang);
    formData.append("link", link);

    try {
      const users = JSON.parse(localStorage.getItem('user'))
      navigate('/')
      await ax.post('https://backend-nm3q.onrender.com/api/projects/', formData, {
        headers: {
          'Authorization': `Bearer ${users.token}`
        }
      })
    } catch (error) {
      setError(error.response.data.error)
    }

  }

  const handleClear = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = ''; // Clear the input value
    }
    setThumbnail(null)
    setLink("")
  }

  return (
    <div className="d-flex justify-items-between align-items-center flex-column">
      <div className="w-50">

        <h2 className="">Add a New Project</h2>

        <div className="d-flex justify-content-around" id="goCol">
          <div className="select">
            <label>Model:</label>
            <select className="form-select" onChange={(e) => setModel(e.target.value)}>
              <option value="tiny">
                tiny
              </option>
              <option value="base">
                base
              </option>
              <option value="small">
                small
              </option>
              <option value="medium">
                medium
              </option>
            </select>
          </div>

          <div className="select" >
            <label>Translate To:</label>
            <select className="form-select" onChange={(e) => setTrans(e.target.value)}>
              {Object.entries(translateLanguages).map(([langCode, langName]) => (
                <option key={langCode} value={langCode}>
                  {langName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="m-3 my-5" id="moreWidth">
        <div className=" d-flex flex-column justify-content-center p-3 border rounded border-2 border-dark mx-5" >
          <h5>Youtube link:</h5>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
          <h5 className="mx-auto my-5">or</h5>
          <h5>Upload your video:</h5>

          <div className="input-group">
            <input className="form-control" ref={inputFileRef} onChange={(e) => setThumbnail(e.target.files[0])} type="file" accept="video/*,audio/*"/>
            <div className="clear-icon" onClick={handleClear}>
              &times;
            </div>
          </div>
        </div>
        <div className="d-flex">
          <button className="btn mx-auto btn-primary p-3 w-50  my-3" onClick={handleSubmit}>Submit!</button>
        </div>

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  )
}

export default ProjectForm