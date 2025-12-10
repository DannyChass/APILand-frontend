import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

export default function API() {
    const { id } = useParams();
    const [apiData, setApiData] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchAPI() {
            const res = await fetch('http://localhost:3000/comments/${id}');
            const data = await res.json();
            setApiData(data);
        }

        async function fetchComments() {
            const res = await fetch('http://localhost:3000/comments/{id}');
            const data = await res.json();
            setComments(data);
        }

        fetchAPI();
        fetchComments();
    }, [id]);

    if (!apiData) return <div>Loading...</div>
}