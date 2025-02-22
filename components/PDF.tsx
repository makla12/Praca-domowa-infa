import React from 'react'
import { Page, View, Text, Document, StyleSheet } from '@react-pdf/renderer';
import { Table, TR, TH, TD } from '@ag-media/react-pdf-table';
import { table } from 'console';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    table: {
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    }
});

export default function PDF({ data } : { data: string[][] }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Import danych</Text>
                    <Table style={styles.table}>
                        <TR>
                            <TH>Imię</TH>
                            <TH>Nazwisko</TH>
                            <TH>Wiek</TH>
                        </TR>
                    </Table>
                </View>
            </Page>
        </Document>
    )
}
