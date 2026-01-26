# SEO Issues Found & Recommendations

## 🔴 Critical Issues

### 1. **Placeholder URLs in sitemap.xml** ⚠️
**Location**: `public/sitemap.xml`
**Issue**: Contains `https://your-domain.com` instead of actual domain
**Impact**: Search engines can't properly index the site
**Priority**: HIGH

### 2. **Placeholder URL in robots.txt** ⚠️
**Location**: `public/robots.txt`
**Issue**: Contains `https://your-domain.com` instead of actual domain
**Impact**: Sitemap reference is broken
**Priority**: HIGH

### 3. **Missing hreflang Tags in HTML** ⚠️
**Location**: `src/app/layout.tsx`
**Issue**: hreflang tags only in sitemap, not in HTML `<head>`
**Impact**: Search engines may not properly understand language alternates
**Priority**: HIGH

### 4. **Incomplete Structured Data** ⚠️
**Location**: `src/components/StructuredData.tsx`
**Issues**:
- Phone number is placeholder: `"+966-13-XXX-XXXX"`
- Missing LocalBusiness schema
- Missing Organization schema for Refad
- Missing BreadcrumbList schema
**Impact**: Reduced rich snippet potential
**Priority**: MEDIUM

### 5. **Missing Open Graph Locale for Arabic** ⚠️
**Location**: `src/app/layout.tsx`
**Issue**: Only `locale: 'en_US'` - missing Arabic locale
**Impact**: Poor social sharing for Arabic content
**Priority**: MEDIUM

---

## 🟡 Medium Priority Issues

### 6. **Video Missing SEO Attributes**
**Location**: `src/components/Banner.tsx`
**Issue**: Video has `preload="none"` and `aria-hidden="true"` - missing proper SEO attributes
**Impact**: Video content not discoverable by search engines
**Priority**: MEDIUM

### 7. **Missing Breadcrumbs**
**Issue**: No breadcrumb navigation or schema
**Impact**: Reduced navigation clarity for search engines
**Priority**: LOW-MEDIUM

### 8. **Missing FAQ Schema**
**Issue**: No FAQ section with structured data
**Impact**: Missing opportunity for FAQ rich snippets
**Priority**: LOW

### 9. **Canonical URL Configuration**
**Location**: `src/app/layout.tsx`
**Issue**: Canonical is just `/` - should be full URL with language variants
**Impact**: Potential duplicate content issues
**Priority**: MEDIUM

### 10. **Missing Article/WebPage Schema**
**Issue**: Could add more specific schema types for different sections
**Impact**: Better content categorization
**Priority**: LOW

---

## 🟢 Low Priority / Enhancements

### 11. **Missing Social Media Verification**
**Issue**: No verification for social platforms
**Priority**: LOW

### 12. **Missing Author Information**
**Issue**: Could add more detailed author/publisher info
**Priority**: LOW

### 13. **Missing Review/Rating Schema**
**Issue**: No review or rating structured data
**Priority**: LOW (if reviews exist)

---

## 📋 Quick Fixes Needed

1. Update sitemap.xml with actual domain
2. Update robots.txt with actual domain
3. Add hreflang tags to HTML head
4. Fix phone number in structured data
5. Add Arabic Open Graph locale
6. Add LocalBusiness schema
7. Improve video SEO attributes
