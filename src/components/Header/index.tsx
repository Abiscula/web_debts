import { useState } from "react";
import { Container, InputSpan } from "./style";
import axios from "axios";

export function Header() {

    const [uploadFile, setUploadFile] = useState<File | null>(null)

    async function sendFile() {
        if (uploadFile) {
            try{
                const resp = await axios.request({
                    method: 'post',
                    baseURL: 'http://localhost:3333/table',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: { table: uploadFile }
                })
                console.log(resp)
            } catch(error) {
                console.log(error)
            }
        }
    }

    return (
        <Container>
            <div>
                <h1>Spending control</h1>
            </div>
            <div>
                <InputSpan uploadFile={uploadFile}>
                    <label htmlFor="upload">{uploadFile ? uploadFile.name : 'Select CSV'}</label>
                    <input
                        type="file"
                        id="upload"
                        accept=".xlsx"
                        onChange={(e) => setUploadFile(e.target.files && e.target.files[0])}
                    />
                </InputSpan>
                <button onClick={sendFile} disabled={uploadFile === null}> Import table</button>
            </div>
        </Container>
    )
}