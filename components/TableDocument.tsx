import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
    family: 'Ubuntu',
    fonts: [
        {
            src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
        },
        {
            src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
            fontWeight: 'bold',
        },
        {
            src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
            fontWeight: 'normal',
            fontStyle: 'italic',
        },
    ],
});

const styles = StyleSheet.create({
    pageStyle: {
        paddingTop: 16,
        paddingHorizontal: 40,
        paddingBottom: 56,
        fontFamily: "Ubuntu"
    },

    tableStyle: {
        width: "auto"
    },

    tableRowStyle: {
        flexDirection: "row"
    },

    firstTableColHeaderStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderBottomColor: "#000",
        borderWidth: 1,
        backgroundColor: "#bdbdbd"
    },

    tableColHeaderStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderBottomColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        backgroundColor: "#bdbdbd"
    },

    firstTableColStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderTopWidth: 0
    },

    tableColStyle: {
        width: "20%",
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },

    tableCellHeaderStyle: {
        textAlign: "center",
        margin: 4,
        fontSize: 12,
        fontWeight: "bold"
    },

    tableCellStyle: {
        textAlign: "center",
        margin: 5,
        fontSize: 10
    },
});

const TableHeader = ({ items }: { items: string[] }) => {
    return (
        <View style={styles.tableRowStyle} fixed>
            {items.map((item, index) => {
                return (
                    <View key={index} style={index === 0 ? styles.firstTableColHeaderStyle : styles.tableColHeaderStyle}>
                        <Text style={styles.tableCellHeaderStyle}>{item}</Text>
                    </View>
                );
            })}
        </View>
    );
};

const TableRow = ({ items }: { items: string[] }) => {
    return (
        <View style={styles.tableRowStyle}>
            {items.map((item, index) => {
                return (
                    <View key={index} style={index === 0 ? styles.firstTableColStyle : styles.tableColStyle}>
                        <Text style={styles.tableCellStyle}>{item}</Text>
                    </View>
                );
            })}
        </View>
    );
};
const TableDocument = ({ data }: { data: string[][] }) => {
    return (
        <Document>
            <Page
                style={styles.pageStyle}
                size="A4"
                orientation="portrait"
            >
                <View style={styles.tableStyle}>
                    {data.map((row, index) => {
                        return (
                            (index === 0 ? <TableHeader key={index} items={row} /> : <TableRow key={index} items={row} />)
                        );
                    })}
                </View>

            </Page>
        </Document>
    );

};

export default TableDocument;