

export default function UpdateProfile(){

    return (
        <div>
            <div className="flex gap-10 items-center">
          <img
            src="#"
            alt="avatar"
            className="h-30 w-30 border border-slate-400 rounded-full"
          />
          <button className=" flex items-center rounded-lg p-2 h-10 bg-slate-200 gap-5">
            <FontAwesomeIcon icon={faUpload} />
            Upload Image
          </button>
        </div>
        </div>
    )
}