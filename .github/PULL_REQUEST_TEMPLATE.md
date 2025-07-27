# 📦 Pull Request

## 📌 Description

<!-- Please provide a summary of the change and what issue is fixed. -->

Fixes #<!-- issue_number (if applicable) -->

## 🧩 Type of Change

Please delete options that are not relevant.

- 🐛 Bug fix
- ✨ New feature
- ♻️ Code refactor
- 🧪 Test addition/changes
- 📝 Documentation update
- 🚀 Performance improvement
- 🔧 Build/deployment changes
- ⚠️ Breaking change

## ✅ Checklist

- [ ] I have followed the project's coding standards
- [ ] I have tested the changes locally
- [ ] All dependent packages are updated (if needed)
- [ ] I have added or updated relevant documentation/comments
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] All new and existing tests passed
- [ ] I have linked the related issue (if applicable)

## 🧪 How to Test

<!-- Describe the steps reviewers should take to test your changes. Include any test credentials, endpoints, or flows. -->

1. Start backend server
2. Run frontend with `npm run dev`
3. Test `/api/barber/token` endpoint manually or using Postman
4. [Optional] Check console logs or database

## 📸 Screenshots / Video

<!-- If UI related, include screenshots or screencasts -->

## 🔍 Review Notes

<!-- Anything reviewers should specifically focus on or be aware of -->

- Focus on validation logic in `BarberTokenController`
- Ensure role-based access is working correctly

## 🚨 Breaking Changes?

- [ ] Yes (please describe below)
- [ ] No

**If yes, please describe:**
<!-- Explain what breaks and how to mitigate it -->

## 📚 Additional Context

<!-- Add any other relevant context, links, dependencies, or screenshots -->
