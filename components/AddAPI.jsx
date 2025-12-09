import { useState } from "react";
import Header from "../components/Header";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";

export default function AddAPI() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [officialLink, setOfficialLink] = useState("");
    const [docLink, setDocLink] = useState("");
    const [example, setExample] = useState([]);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const handleAddTag = () => {
        if (newTag.trim() !== "") {
            setTags([...tags, newTag]);
            setNewTag("");
        }
    }

    return (
        <div className="min-h-screen bg-[#EAF7FF]">
            <Header />

            <div className="w-[80%] flex justify-between">
                <div className="w-[300px] h-[300px] bg-stone-200 rounded-x1 flex items-center justify-center">
                    <img src="" className="h-16 opacity-60"></img>
                </div>

                <div className="flex flex-col w-[50%] gap-4">

                    <InputText
                        Type="text"
                        Name="apiName"
                        placeHolder="Add name"
                        classname="h-10 border-gray-300 rounded-md pl-3"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                        placeholder="Add description"
                        className="bg-white h-[140px] border-gray-300 rounded-md p-3"
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="flex gap-5">
                        <InputText
                            Type="text"
                            Name="officialLink"
                            placeHolder="Ajouter lien officiel"
                            className="w-[50%]"
                            onChange={(e) => setOfficialLink(e.target.value)}
                        />

                        <InputText
                            Type="text"
                            Name="docLink"
                            placeHolder="Ajouter lien documentation"
                            classname="w-[50%]"
                            onChange={(e) => setDocLink(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="w-[80%] mt-10">
                <textarea
                    placeholder="Add example"
                    className="w-full bg-white h-[200px] rounded-xl border border-gray-300 shadow-md p-4"
                    onChange={(e) => setExample(e.target.value)}
                />
            </div>

            <div className="w-[80%] mt-10">
                <div className="flex gap-5 items-center">
                    <InputText
                        Type="text"
                        placeHolder="New tag"
                        classname="w-[200px]"
                        onChange={(e) => setNewTag(e.target.value)} />
                </div>

                <Button
                    classname="bg-[#B8A9FF] text-white px-6 py-2 rounded-md hover:bg-[#9d90de]"
                    onClick={handleAddTag}
                >
                    Add tag
                </Button>

                <div className="flex gap-4 mt-6">
                    {tags.map((tag, index) => (
                        <div key={index} className="px-5 py-2 bg-[#F5F0FF] text-stone-500 rounded-md shadow">
                            {tag}
                        </div>
                    ))}
                </div>

                <div className="w-[80%] mt-16">
                    <Button
                        classname="bg-[#B8A9FF] text-white px-10 py-3 rounded-md hover:bg-[#9d90de]"
                        onClick={() => console.log("Submit data here")}
                    >
                        Add
                    </Button>

                </div>
            </div>
        </div>
    );
}