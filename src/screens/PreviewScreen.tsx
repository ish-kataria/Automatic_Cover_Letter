import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import { generateCoverLetter } from '../services/geminiai';
import LoadingIndicator from '../components/LoadingIndicator';
import Divider from '../components/Divider';

const PreviewScreen: React.FC<{ route: any }> = ({ route }) => {
    const { name, email, phone, address, resumeUri, company, jobDescription, role, linkedin } = route.params;
    const [coverLetter, setCoverLetter] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchCoverLetter = async () => {
            try {
                let result = await generateCoverLetter({
                    name,
                    email,
                    phone,
                    address,
                    resumeUri,
                    company,
                    jobDescription,
                    role,
                    linkedin

                });
                result = JSON.parse(result).candidates[0].content.parts[0].text.trim();
                setCoverLetter(result.slice(7, result.length - 3));
            } catch (error) {
                console.error('Error generating cover letter:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoverLetter();
    }, []);

    const handleShare = async () => {
        try {
            const file = await RNHTMLtoPDF.convert({
                html: `${coverLetter}`,
                fileName: 'CoverLetter',
                directory: 'Documents',
            });
            await Share.open({ url: `file://${file.filePath}`, type: 'application/pdf' });
        } catch (error) {
            console.error('Error sharing file:', error);
        }
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Generated Cover Letter:</Text>
            <Divider />
            <Text style={styles.content}>{coverLetter}</Text>
            <Divider />
            <Button title="Share as PDF" onPress={handleShare} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    content: {
        marginBottom: 20,
        fontSize: 16,
        lineHeight: 24,
    },
});

export default PreviewScreen;