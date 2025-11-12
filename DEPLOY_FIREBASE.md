# Firebase Deployment Guide

## Quick Steps to Deploy Firebase Rules

### Prerequisites
- Node.js installed on your computer
- Firebase CLI installed
- Access to your Firebase project

### Step 1: Install Firebase CLI (if not already installed)

Open terminal/command prompt and run:

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

This will open a browser window to authenticate with your Google account.

### Step 3: Navigate to Project Directory

```bash
cd "C:\Users\Dell\Documents\Visual Studio 2022\parisien\OKComputer_巴黎旅游网站功能升级 (1)"
```

### Step 4: Initialize Firebase (First Time Only)

```bash
firebase init firestore
```

When prompted:
- Select "Use an existing project"
- Choose: **tourism-paris**
- Use default file names:
  - Firestore Rules: `firestore.rules` (already created)
  - Firestore Indexes: `firestore.indexes.json` (press Enter for default)

### Step 5: Deploy the Rules

```bash
firebase deploy --only firestore:rules
```

You should see:
```
✔  firestore: deployed successfully
```

### Step 6: Verify Deployment

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **tourism-paris**
3. Click on "Firestore Database" in the left menu
4. Click on "Rules" tab
5. You should see your deployed rules

---

## Alternative: Manual Deployment via Console

If you prefer not to use the CLI:

1. **Open Firebase Console**: https://console.firebase.google.com/
2. **Select Project**: tourism-paris
3. **Navigate to**: Firestore Database → Rules
4. **Copy contents** of `firestore.rules` file
5. **Paste** into the Rules editor
6. **Click** "Publish" button

---

## Testing the Rules

After deployment, test in browser console:

```javascript
// This should work (creating itinerary)
firebase.firestore().collection('itineraries').doc('test-session').set({
    items: [{id: 'eiffel', addedAt: Date.now()}],
    lastUpdated: Date.now()
}).then(() => console.log('Success!')).catch(err => console.error('Error:', err));

// This should work (reading itinerary)
firebase.firestore().collection('itineraries').doc('test-session').get()
    .then(doc => console.log('Data:', doc.data()));

// This should work (creating contact)
firebase.firestore().collection('contacts').add({
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message',
    timestamp: Date.now()
}).then(() => console.log('Contact saved!'));
```

---

## Current Rules Summary

Your `firestore.rules` file allows:

### ✅ Allowed (Public):
- **Creating** itineraries (anyone)
- **Reading** itineraries (anyone)
- **Writing** itineraries (anyone)
- **Creating** contact submissions (anyone)
- **Creating** feedback (anyone)
- **Reading** attractions data (anyone)
- **Reading** events data (anyone)
- **Subscribing** to newsletter (anyone)

### ❌ Not Allowed (Protected):
- **Reading** contact submissions
- **Reading** feedback (except own)
- **Writing** attractions data
- **Writing** events data
- **Deleting** any user-submitted data

---

## Security Notes

The current rules are permissive for public access (suitable for a tourism website). In production, consider:

1. **Add Rate Limiting**: Implement Cloud Functions to prevent abuse
2. **Add Validation**: Validate data structure and content
3. **Add Authentication**: Require sign-in for certain features
4. **Monitor Usage**: Set up alerts in Firebase Console

---

## Troubleshooting

### Error: "Permission denied"
- Check rules are deployed correctly
- Verify project ID matches
- Check browser console for specific errors

### Error: "Failed to authenticate"
Try:
```bash
firebase logout
firebase login
```

### Error: "Project not found"
Verify project ID:
```bash
firebase projects:list
```

---

## Updating Rules

When you modify `firestore.rules`:

1. Save the file
2. Run: `firebase deploy --only firestore:rules`
3. Test the changes

---

## Firebase Console Links

- **Project Overview**: https://console.firebase.google.com/project/tourism-paris
- **Firestore Database**: https://console.firebase.google.com/project/tourism-paris/firestore
- **Rules Editor**: https://console.firebase.google.com/project/tourism-paris/firestore/rules
- **Usage Stats**: https://console.firebase.google.com/project/tourism-paris/usage

---

## Contact

For issues with deployment:
- Email: hhnk3693@gmail.com
- Firebase Support: https://firebase.google.com/support

---

**Important**: Always test rules changes in the Firebase Console simulator before deploying to production!
