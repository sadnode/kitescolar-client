import { Flex } from "@chakra-ui/react";
import {useDropzone} from 'react-dropzone';

export function DropFiles() {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <Flex 
        p={10}
        border={isDragActive ? "1px dashed #38A169" : "1px dashed #87CEFA"}
        borderRadius={8}
        textAlign="center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Solte os arquivos aqui ...</p> :
            <p>Arraste e solte arquivos aqui ou clique para selecionar</p>
        }
      </Flex>
      <Flex>
        <ul>
          {files}
        </ul>
      </Flex>
    </>
  );
}
