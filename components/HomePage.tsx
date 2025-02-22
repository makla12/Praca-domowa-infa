'use client';

import React from 'react';
import { Button, FileInput, Select, Label, Table } from "flowbite-react";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDF from './PDF';


export default function HomePage() {
    const [stage, setStage] = React.useState<number>(0);
    const [file, setFile] = React.useState<string | null>(null);
    const [separator, setSeparator] = React.useState<string>("null");
    const [data, setData] = React.useState<string[][]>([]);
    const [sortBy, setSortBy] = React.useState<string>("null");

    const getFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (files === null) return;
        const file = files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const data = reader.result;
            setFile(data as string);
        }

        reader.onerror = () => {
            console.log(reader.error);
        }

        reader.readAsText(file);
    }

    const getAutoSeparator = () => {
        if (file === null) return;
        const rows = file.split('\n');
        const separators = [';', '\t'];
        let newSeparator = null;

        separators.forEach(separator => {
            const numberOfCols = rows[0].split(separator).length;
            if (numberOfCols === 1) return;
            let separatorGood = 0
            rows.forEach(row => { if (row.split(separator).length === numberOfCols) separatorGood++; });
            if (separatorGood >= rows.length * 0.8) newSeparator = separator;
        });

        if (newSeparator !== null) setSeparator(newSeparator);
    }

    const getData = () => {
        if (file === null) return;

        const rows = file.split('\n');
        const newData = rows.map(row => row.split(separator));
        const tableCols = newData[0].length;
        newData.forEach((row, index) => {
            if (row.length !== tableCols) newData.splice(index, 1);
        });
        newData.forEach(row => row.map(cell => cell.trim()));
        newData.forEach(row => row.map(cell => isNaN(Number(cell)) ? cell : Number(cell)));
        setData(newData);
    }

    const sortData = () => {
        if (sortBy === "null") return;
        const newData = Array.from(data.slice(1));

        const indexForSort = parseInt(sortBy);
        if (isNaN(indexForSort)) return;

        newData.sort((a, b) => {
            if (a[indexForSort] < b[indexForSort]) return -1;
            if (a[indexForSort] > b[indexForSort]) return 1;
            return 0;
        });
        newData.unshift(data[0]);
        console.log(newData);

        setData(newData);
    }

    return (
        <div className='w-screen h-screen absolute overflow-x-hidden'>

            <div className={`w-screen h-screen flex justify-center items-center flex-col gap-10 flex-shrink-0 absolute transition-transform duration-500 ${stage === 0 ? 'translate-x-0' : 'translate-x-[-100%]'}`}>
                <div className='flex flex-col gap-10'>
                    <FileInput onChange={getFile} />
                    <Button onClick={() => { setStage(1) }} disabled={file === null} gradientDuoTone='purpleToBlue'> <HiOutlineArrowRight /> </Button>
                </div>
            </div>

            <div className={`w-screen h-screen flex justify-center items-center flex-col gap-10 flex-shrink-0 absolute transition-transform duration-500 ${stage === 1 ? 'translate-x-0' : (stage < 1 ? 'translate-x-[100%]' : 'translate-x-[-100%]')}`}>
                <div className='flex flex-col gap-10'>
                    <Button className='w-10' onClick={() => { setStage(0) }}> <HiOutlineArrowLeft /> </Button>
                    <Button onClick={() => { getAutoSeparator() }} gradientDuoTone='purpleToBlue'>Wykryj automatycznie</Button>
                    <div>
                        <Label htmlFor="separator" value="Wybierz separator znajdujący się w pliku" />
                        <Select id='separator' value={separator} onChange={(e) => { setSeparator(e.target.value) }} >
                            <option disabled value={"null"}> -- wybierz opcję -- </option>
                            <option value=";">Średnik(;)</option>
                            <option value={'\t'}>Tabulator(\t)</option>
                        </Select>
                    </div>

                    <Button onClick={() => { setStage(2); getData(); setSortBy("null"); }} disabled={separator === "null"} gradientDuoTone='purpleToBlue'> <HiOutlineArrowRight /> </Button>
                </div>
            </div>

            <div className={`w-screen h-screen flex justify-center items-center flex-col gap-10 flex-shrink-0 absolute transition-transform duration-500 ${stage === 2 ? 'translate-x-0' : (stage < 2 ? 'translate-x-[100%]' : 'translate-x-[-100%]')}`}>
                <div className='flex flex-col gap-10'>
                    <Button className='w-10' onClick={() => { setStage(1) }}> <HiOutlineArrowLeft /> </Button>

                    {(data.length === 0) ? <p>Brak danych</p> :
                        <>
                            <Table>
                                <Table.Head>
                                    {data[0].map((cell, index) => <Table.HeadCell key={index}>{cell}</Table.HeadCell>)}
                                </Table.Head>

                                <Table.Body className="divide-y">
                                    {data.slice(1).map((row, index) => (
                                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            {row.map((cell, index) => <Table.Cell key={index}>{cell}</Table.Cell>)}
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>

                            <div className='flex flex-col gap-5'>
                                <Label htmlFor="sort" value="Sortowanie według wybranej kolumny" />
                                <Select id='sort' value={sortBy} onChange={(e) => { setSortBy(e.target.value) }} >
                                    <option disabled value={"null"}> -- wybierz opcję -- </option>
                                    {data[0].map((cell, index) => <option key={index} value={index}>{cell}</option>)}
                                </Select>
                                <Button onClick={sortData} disabled={sortBy === "null"} gradientDuoTone='purpleToBlue'> Posortuj </Button>
                            </div>
                            {/* <PDFDownloadLink document={<PDF data={data} />} fileName="data.pdf"> */}
                                <Button className='w-full' gradientDuoTone='greenToBlue'> Pobierz jako pdf </Button>
                            {/* </PDFDownloadLink> */}
                            <PDFViewer>
                                <PDF data={data} />
                            </PDFViewer>
                        </>
                    }
                </div>

            </div>
        </div>
    )
}
