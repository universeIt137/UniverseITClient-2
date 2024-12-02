import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
    Image,
} from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 40, // Reduced padding for compact layout
        fontFamily: 'Helvetica',
        position: 'relative',
        backgroundColor: '#ffffff',
    },
    shapeLeft: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 40,
    },
    shapeRight: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: 40,
    },
    shapeTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 30, // Reduced height of the top shape
    },
    shapeBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 30, // Reduced height of the bottom shape
    },
    title: {
        textAlign: 'center',
        fontSize: 18, // Reduced font size
        fontWeight: 'bold',
        marginTop: 10, // Reduced margin
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 14, // Reduced font size
        marginBottom: 10, // Reduced margin
    },
    name: {
        textAlign: 'center',
        fontSize: 22, // Reduced font size
        fontWeight: 'bold',
        color: '#4A90E2',
        marginVertical: 10, // Reduced margin
    },
    content: {
        textAlign: 'center',
        fontSize: 10, // Reduced font size
        marginBottom: 20, // Reduced margin
    },
    logoContainer: {
        position: 'absolute',
        top: 20, // Adjusted position
        left: 20,
        width: 80, // Reduced size
        height: 80,
    },
    qrCode: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 60, // Reduced size
        height: 60,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20, // Reduced margin
        paddingHorizontal: 10,
    },
    footerLeft: {
        textAlign: 'left',
        fontSize: 8, // Reduced font size
    },
    footerRight: {
        textAlign: 'right',
        fontSize: 8, // Reduced font size
    },
});

// PDF Document Component
const SingleStudentPDF = ({ data, shapeUrl }) => (
    <Document>
        <Page size={[595.28, 700]} style={styles.page}>
            {/* Decorative Borders */}
            {shapeUrl && <Image src={shapeUrl} style={styles.shapeLeft} />}
            {shapeUrl && <Image src={shapeUrl} style={styles.shapeRight} />}
            {shapeUrl && <Image src={shapeUrl} style={styles.shapeTop} />}
            {shapeUrl && <Image src={shapeUrl} style={styles.shapeBottom} />}

            {/* Logo */}
            {data?.logo_url && <Image src={data.logo_url} style={styles.logoContainer} />}

            {/* QR Code */}
            {data?.qr_code_url && <Image src={data.qr_code_url} style={styles.qrCode} />}

            {/* Title */}
            <Text style={styles.title}>CERTIFICATE OF ACHIEVEMENT</Text>
            <Text style={styles.subtitle}>This certificate is proudly presented to</Text>

            {/* Name */}
            <Text style={styles.name}>{data?.name}</Text>

            {/* Course and Details */}
            <Text style={styles.content}>
                Has successfully completed {data?.hours} hours in the "{data?.course_category}" course on "{data?.course_name}".{'\n'}
                Student ID: {data?.student_ID}.{' '}
                From {data?.duration || 'N/A'}.
            </Text>

            {/* Footer: Date of Issue and Signature */}
            <View style={styles.footerContainer}>
                <View style={styles.footerLeft}>
                    <Text>Date of Issue:</Text>
                    <Text>{data?.date_of_issue || 'N/A'}</Text>
                </View>
                <View style={styles.footerRight}>
                    <Text>Authorized Signature</Text>
                    <Text>Universe IT Institute</Text>
                </View>
            </View>
        </Page>
    </Document>
);

// Certificate Download Component
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

    // Add URL for the decorative shape
    const shapeUrl = 'https://res.cloudinary.com/dnvmj9pvk/image/upload/v1732435295/certificate-shape_yyzbgi.png'; // Replace with actual path of the uploaded shape.

    return (
        <div className="mx-auto p-6 bg-white shadow-md rounded-lg max-w-2xl">
            <h1 className="text-2xl font-bold mb-4 text-center">Download Certificate</h1>

            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : pdfData ? (
                <PDFDownloadLink
                    document={<SingleStudentPDF data={pdfData} shapeUrl={shapeUrl} />}
                    fileName={`${pdfData.name}_certificate.pdf`}
                >
                    {({ loading }) =>
                        loading ? (
                            <button className="btn btn-primary" disabled>
                                Loading PDF...
                            </button>
                        ) : (
                            <button className="btn btn-primary">Download Certificate</button>
                        )
                    }
                </PDFDownloadLink>
            ) : (
                <p className="text-center">Certificate data not found</p>
            )}
        </div>
    );
};

export default CertificateDownload;
