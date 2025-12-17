import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"

export default function AccountSettings() {
  const [showModal, setShowModal] = useState(false)

  const [user, setUser] = useState({})

  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [country, setCountry] = useState("")

  /* -------------------- Handlers -------------------- */

  const handleGenderChange = (e) => {
    setGender(e.target.value)
  }

  const handleCancel = () => {
    setEmail(user.email || "")
    setPhoneNumber(user.telephoneNumber || "")
    setBirthDate(user.birthDate || "")
    setGender(user.gender || "")
    setCountry(user.country || "")
  }

  /* -------------------- API calls -------------------- */

  const deleteAccount = async () => {
    const accessToken = localStorage.getItem("accessToken")

    const response = await fetch("http://localhost:3000/users/me", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()

    if (data) {
      console.log("Account deleted")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("user")
      window.location.href = "/HomePage"
    } else {
      console.error("Account deletion error")
    }
  }

  const updateAccount = async () => {
    const accessToken = localStorage.getItem("accessToken")

    const payload = {
      email,
      telephoneNumber: phoneNumber,
      birthDate,
      gender,
      country,
    }

    const response = await fetch("http://localhost:3000/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (data.result) {
      setShowModal(true)
    }

    console.log("Backend response:", data)
  }

  /* -------------------- Fetch user -------------------- */

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) return

    ;(async () => {
      const response = await fetch("http://localhost:3000/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      setUser(data.user)
    })()
  }, [])

  useEffect(() => {
    if (!user) return

    setEmail(user.email || "")
    setGender(user.gender || "")
    setPhoneNumber(user.telephoneNumber || "")
    setBirthDate(user.birthDate || "")
    setCountry(user.country || "")
  }, [user])

  /* -------------------- UI -------------------- */

  return (
    <div className="flex flex-col gap-20 w-150 py-20">
      {/* Header */}
      <div className="flex flex-col ml-25">
        <h2 className="text-2xl font-bold text-slate-800">
          Account Management
        </h2>
        <p>
          Manage your personal information, security settings, and account
          preferences.
        </p>
      </div>

      {/* Account */}
      <div className="flex flex-col w-full gap-5 ml-25">
        <h4 className="text-lg font-bold text-slate-700">Your Account</h4>

        <div className="divSetting">
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="Email address"
            className="inputSetting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="divSetting">
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="inputSetting"
          />
        </div>

        {/* Personal info */}
        <div className="flex flex-col w-full gap-5 mt-10">
          <h4 className="text-lg font-bold text-slate-700">
            Personal Information
          </h4>

          <div className="divSetting">
            <label className="label">Phone number</label>
            <input
              type="text"
              placeholder="Phone number (optional)"
              className="inputSetting"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="divSetting">
            <label className="label">Date of birth</label>
            <input
              type="date"
              className="inputSetting"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className="divSetting">
            <label className="label">Gender identity</label>
            <div className="flex gap-20">
              <label className="flex gap-5 items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                  className="accent-blue-500 h-5 w-5"
                />
                Male
              </label>

              <label className="flex gap-5 items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                  className="accent-blue-500 h-5 w-5"
                />
                Female
              </label>
            </div>
          </div>

          <div className="divSetting">
            <label className="label">Country / Region</label>
            <input
              type="text"
              placeholder="Country / region"
              className="inputSetting"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>

        {/* Danger zone */}
        <div className="flex items-center gap-10 mt-10">
          <button className="rounded-lg p-2 h-10 bg-slate-200 hover:bg-slate-300">
            Deactivate account
          </button>
          <div className="w-70">
            <h4 className="font-bold text-slate-700">Deactivate account</h4>
            <p>Temporarily hide your profile and activity.</p>
          </div>
        </div>

        <div className="flex items-center gap-10 mt-10">
          <button
            onClick={deleteAccount}
            className="rounded-lg p-2 h-10 bg-slate-200 hover:bg-slate-300"
          >
            Delete account
          </button>
          <div className="w-70">
            <h4 className="font-bold text-slate-700">Delete account</h4>
            <p className="text-sm">
              Permanently delete your data and everything associated with your
              account.
            </p>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-400/80 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-green-600 mb-4">
              ✅ Information updated
            </h2>
            <p className="text-gray-700 mb-6">
              Your account information has been successfully updated.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-slate-200 rounded hover:bg-slate-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 w-full h-20 bg-white shadow-[0_-4px_6px_rgba(0,0,0,0.1)] flex items-center">
        <button
          onClick={updateAccount}
          className="ml-45 rounded-lg p-2 h-10 bg-slate-200 hover:bg-slate-300"
        >
          Save changes
        </button>

        <button
          onClick={handleCancel}
          className="ml-10 rounded-lg p-2 h-10 bg-slate-200 hover:bg-slate-300"
        >
          Cancel
        </button>
      </footer>
    </div>
  )
}