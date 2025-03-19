import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeUri, setResumeUri] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [role, setRole] = useState('');

  const handleGenerate = () => {
    console.log("Printing name : In HandleGenerate")
    navigation.navigate('Preview', { name, email, phone, address, resumeUri, company, jobDescription, role, linkedin });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cover Letter Assistant</Text>

      <InputField
        label="Your Name"
        value={name}
        onChangeText={setName}
        editable={true}
      />
      <InputField
        label="Your Address"
        value={address}
        onChangeText={setAddress}
        editable={true}
      />
      <InputField
        label="Your Phone Number"
        value={phone}
        onChangeText={setPhone}
        editable={true}
      />
      <InputField
        label="Your Linkedin Profile (Link)"
        value={linkedin}
        onChangeText={setLinkedin}
        editable={true}
      />
      <InputField
        label="Your Email"
        value={email}
        onChangeText={setEmail}
        editable={true}
      />

      {/* Resume Input Field */}
      <InputField
        label="Resume (Google Drive link)"
        value={resumeUri}
        onChangeText={setResumeUri}
        editable={true}
      />

      <InputField
        label="Company Name"
        value={company}
        onChangeText={setCompany}
      />

      <InputField
        label="Job Description (LinkedIn link)"
        value={jobDescription}
        onChangeText={setJobDescription}
        multiline
        numberOfLines={4}
      />

      <InputField
        label="Role"
        value={role}
        onChangeText={setRole}
      />

      <CustomButton title="Generate Cover Letter" onPress={handleGenerate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;