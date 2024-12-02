import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
    PDFViewer,
    Image,
} from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontFamily: 'Helvetica',
        position: 'relative',
        backgroundColor: '#ffffff',
    },
    borderContainer: {
        borderWidth: 20,
        borderColor: '#2E7270',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    decorativeBorder: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        borderWidth: 5,
        borderColor: '#FFD700',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        color: '#2E7270',
    },
    subtitle: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 15,
        color: '#333',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 30,
        color: '#4A90E2',
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 40,
        lineHeight: 1.5,
        marginBottom: 40,
        color: '#555',
    },
    logoContainer: {
        position: 'absolute',
        top: 30,
        left: 30,
        width: 80,
        height: 80,
    },
    qrCode: {
        position: 'absolute',
        top: 30,
        right: 30,
        width: 80,
        height: 80,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        left: 50,
        right: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 12,
        color: '#333',
    },
    signatureBlock: {
        textAlign: 'center',
        borderTopWidth: 1,
        borderColor: '#000',
        paddingTop: 5,
        marginTop: 10,
    },
});

const SingleStudentPDF = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Outer Decorative Border */}
            <View style={styles.borderContainer}></View>
            <View style={styles.decorativeBorder}></View>

            {/* Logo */}
            {data?.logo_url && <Image src={data.logo_url} style={styles.logoContainer} />}

            {/* QR Code */}
            {data?.qr_code_url && <Image src={data.qr_code_url} style={styles.qrCode} />}

            {/* Certificate Title */}
            <Text style={styles.title}>Certificate of Excellence</Text>
            <Text style={styles.subtitle}>This is awarded to</Text>

            {/* Recipient Name */}
            <Text style={styles.name}>{data?.name}</Text>

            {/* Details */}
            <Text style={styles.content}>
                In recognition of successfully completing {data?.hours} hours in the "{data?.course_category}" course titled "{data?.course_name}".
                This certificate is issued with great appreciation for your hard work and dedication.
            </Text>

            {/* Footer */}
            <View style={styles.footer}>
                <View>
                    <Text>Date of Issue:</Text>
                    <Text>{data?.date_of_issue || 'N/A'}</Text>
                </View>
                <View style={styles.signatureBlock}>
                    <Text>Authorized Signature</Text>
                    <Text>Universe IT Institute</Text>
                </View>
            </View>
        </Page>
    </Document>
);

const CertificateDownload = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: pdfData = {}, isLoading } = useQuery({
        queryKey: ['certificateData', id],
        queryFn: async () => {
            const response = await axiosPublic.get(`/certificate-generate/${id}`);
            return response.data;
        },
    });

    return (
        <div className="mx-auto p-6 bg-gray-100 shadow-md rounded-lg max-w-4xl">
            <h1 className="text-2xl font-bold mb-4 text-center">View & Download Certificate</h1>

            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : pdfData ? (
                <>
                    {/* PDF Viewer */}
                    <div className="border p-4 rounded-lg mb-4 bg-white">
                        <PDFViewer style={{ width: '100%', height: '600px' }}>
                            <SingleStudentPDF data={pdfData} />
                        </PDFViewer>
                    </div>

                    {/* Download Link */}
                    <div className="text-center">
                        <PDFDownloadLink
                            document={<SingleStudentPDF data={pdfData} />}
                            fileName={`${pdfData.name}_certificate.pdf`}
                        >
                            {({ loading }) => (
                                <button
                                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Loading PDF...' : 'Download Certificate'}
                                </button>
                            )}
                        </PDFDownloadLink>
                    </div>
                </>
            ) : (
                <p className="text-center">Certificate data not found</p>
            )}
        </div>
    );
};

export default CertificateDownload;
