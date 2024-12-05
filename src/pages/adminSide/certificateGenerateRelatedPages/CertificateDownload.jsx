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
        width: '100%',
        height: '100%',
        padding: 40,
        flexDirection: 'column',
        backgroundColor: '#fdf6e3',
        position: 'relative',
        fontFamily: 'Times-Roman',
    },
    border: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
        borderWidth: 10,
        borderColor: '#2E7270',
    },
    decorativeBorder: {
        position: 'absolute',
        top: 40,
        left: 40,
        right: 40,
        bottom: 40,
        borderWidth: 5,
        borderColor: '#FFD700',
    },
    logo: {
        position: 'absolute',
        top: 40,
        left: 40,
        width: 80,
        height: 80,
    },
    qrCode: {
        position: 'absolute',
        top: 80,
        right: 80,
        width: 80,
        height: 80,
    },
    title: {
        top: 150,
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2E7270',
        marginBottom: 10,
    },
    subtitle: {
        top:160,
        textAlign: 'center',
        fontSize: 20,
        color: '#4d6980',
        marginBottom: 30,
    },
    name: {
        textAlign: 'center',
        top: 170,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginBottom: 20,
    },
    details: {
        top: 180,
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        marginBottom: 50,
        marginHorizontal: 60,
        lineHeight: 1.5,
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        left: 80,
        right: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    signatureBlock: {
        right: 40,
        textAlign: 'center',
        borderTopWidth: 1,
        borderColor: '#333',
        paddingTop: 5,
        marginTop: 10,
    },
});

const SingleStudentPDF = ({ data }) => (
    <Document>
        <Page size={[842, 595]} style={styles.page}> {/* Horizontal A4 (landscape) */}
            {/* Decorative Borders */}
            <View style={styles.border}></View>
            <View style={styles.decorativeBorder}></View>

            {/* Logo */}
            {data?.logo_url && <Image src={data.logo_url} style={styles.logo} />}

            {/* QR Code */}
            {data?.qr_code_url && <Image src={data.qr_code_url} style={styles.qrCode} />}

            {/* Title */}
            <Text style={styles.title}>Certificate of Achievement</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>This is proudly presented to</Text>

            {/* Recipient Name */}
            <Text style={styles.name}>{data?.name}</Text>

            {/* Course Details */}
            <Text style={styles.details}>
                For successfully completing {data?.hours} hours in the
                "{data?.course_category}" course titled "{data?.course_name}". This
                certificate is issued in recognition of your dedication and hard work.
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
                        <PDFViewer style={{ width: '100%', height: '500px' }}>
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
