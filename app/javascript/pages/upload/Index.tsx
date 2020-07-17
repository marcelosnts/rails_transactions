import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/header/Index';
import FileList from '../../components/fileList/Index';
import Dropzone from '../../components/dropzone/Index';

import { Container, ImportFileContainer, Footer } from './styles';

import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    if (!uploadedFiles.length) return;

    try {
      data.append('file', uploadedFiles[0].file);
      console.log(data);

      api.post('transactions/import', data).then(response => {
        history.push('/transactions');
      });
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const uploadFiles = files.map(file => ({
      file,
      name: file.name,
    }));

    setUploadedFiles(uploadFiles);
  }

  return (
    <>
      <Container>
        <Header />
        
        <ImportFileContainer>
          <Dropzone onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;