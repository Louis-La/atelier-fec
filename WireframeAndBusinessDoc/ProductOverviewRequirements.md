# Project Atelier

**Business Requirements Document**

*Version 1.0*

**Overview**

Our outdated client-facing retail web-portal has become significantly outdated and has been proven to be hurting sales numbers.   Project Atelier comprises a complete redesign of the retail portal designed to address this concern and modernize the site.  This document outlines the features to be implemented as part of Project Atelier in its initial release.  The following requirements define the new user interface required for customers to browse items in our retail catalog.
**Scope**

The initial release will focus on providing the minimum viable product for our retail application. Features implemented will be constrained to the client experience which enables customers to search, browse, add to cart, and checkout. Maintenance of the catalog and internal systems are not in scope for this project. Improvements other than those to the client user interface are out of scope for this project. Specific improvements discussed and anticipated by the business team are outlined below.

## Product Detail Page

The product detail page will show relevant information for a single product in the catalogue.  Our catalogue is organized by products.  One single product can be associated to many sizes and styles which each result in unique SKUs (stock keeping units).  The product detail page will present items at the product level.  Further breakdown by style or size will only be reflected within the product detail page.
The same product detail page will be shown for every product in the catalogue.  Upon navigating to the product detail page or selecting a new product to display, the contents of the page will update to show information relevant to the selected product.

The item detail page will be comprised of distinct modules.  Each module will display information related to the product being displayed.   For the initial implementation, the following modules have been prioritized:

Product Detail - Critical Priority
Ratings & Reviews - High Priority
Questions & Answers - High Priority
Related Items & Outfit Creation - High Priority

**Overview**

The Overview module will be the top-most module on the Product Detail page.  The functionality contained within this module can be divided into several pieces:
1) Image gallery
2) Product information
3) Style selector
4) Add to cart

This component will guide the customer through selecting a specific style and size to add to their cart. As such, portions of the Overview module, such as the image gallery and cart selection, will be specific to a SKU chosen as opposed to the overarching product.

**Product Information**

General information about the product will be displayed at the top of the Overview.   The following information will show:

1) Star Rating (# of Reviews) - Each product has an average rating based on its reviews.  The average rating of the product will be represented by an array of solid or outlined stars, where the number of solid stars represents the review score. A total of 5 stars should always appear.  The number of stars filled in should correspond to the average score.

The visual for rating should be representative of up to a quarter of a review point.  For example, if the average is 3.8, this should display as 3¾ solid stars and 1¼ outlined stars.

Next to the star rating, a link stating “Read all [#] reviews” will show.   The total number of reviews should be inserted in place of [#].  Clicking this link should scroll the page to the Ratings & Reviews module described in section 1.2.
If there are no reviews, this entire section should be hidden.

2) Product Category

3) Product Title

4) Price - The price is not actually derived from the product, but the style currently selected.  It should update dynamically with the user’s updates to style selected.  A default style will be designated for each product.  This style should appear if no further selection has been made.

The price may be on sale.  If the SKU is currently discounted, then the sale price should appear in red, followed by the original price which is struckthrough.

5) Product Overview -  This free form text field may exist on some items.  If it is available it should be displayed.

**Style Selector**

Below the product information, the user should be presented all the styles of the product and have the ability to toggle between them.  Each style should be displayed as a thumbnail.

All styles should display for the current product at all times.  There is no limit to the number of styles a product can have.  The thumbnails should appear in rows of 4.

The current selection should be indicated within the list by the overlay of a checkmark on top of the thumbnail for that style.   Additionally, the title for that style should appear typed out in full above the thumbnail list.

A user will be able to change the selected style by clicking on the thumbnail displaying that style.   Clicking on the thumbnail for the currently selected style will have no impact.

By default, the style selected will be the first in the list.

A product will always have at least one style.

Only one style can be selected at a time.  A style must be selected at all times.

**Add to Cart**

Below the style selector, two dropdowns should allow the user to select the size and quantity of the item to add to their cart.   The options available within these dropdowns will vary based on the selected product style.

*Size Selector*

The first dropdown will list all of the available sizes for the currently selected style.

Only sizes that are currently in stock for the style selected should be listed.  Sizes not available should not appear within the list.  If there is no remaining stock for the current style, the dropdown should become inactive and read “OUT OF STOCK”.

When collapsed, the dropdown should show the currently selected size.

By default, the dropdown should show “Select Size”.

*Quantity Selector*

The second dropdown will allow the user to select a quantity of the current style and size to add to their cart.

The options in this dropdown will be a sequence of integers ranging from 1 to the maximum.  The maximum selection will be capped by either the quantity of this style and size in stock, or a hard limit of 15.

For example, if the SKU for the selected product style and size has 4 units left in stock, the dropdown will allow choice of 1, 2, 3 or 4.  However if there are 30 units in stock, the dropdown will only present from 1 to 15.

If the size has not been selected, then the quantity dropdown will display ‘-’ and the dropdown will be disabled.

Once a size has been selected, the dropdown should default to 1.

*Add to cart*

A button labeled “Add to Cart” will appear below the size and quantity dropdowns.  This button will be used to place the style, size and quantity of the product selected into the user’s cart.

Dependent on the current selection in the size and quantity dropdowns, this button will have differing functionality.

If the default ‘Select Size’ is currently selected: Clicking this button should open the size dropdown, and a message should appear above the dropdown stating “Please select size”.

If there is no stock: This button should be hidden

If both a valid size and valid quantity are selected: Clicking this button will add the product to the user’s cart.

**Image Gallery**

The largest piece of the Overview module will be a photo gallery showing images of the product.  The photos presented in this gallery will be specific to the currently selected product style.  Each time a new style is chosen, the gallery will update to show photos corresponding to the new style.   Each style will have a set of images associated with it.  The gallery will allow customers to browse between and zoom in on these photos.

The gallery will be viewable in two states.  A default collapsed view, and an expanded view.

*Default View*

The default view of the image gallery will be a single main image, overlaid by the list of thumbnail images.

By default, the first image in the set will be displayed as the main image.  This image will match the smaller thumbnail image shown first.

When switching between styles, the index of the image currently selected should be maintained when the gallery updates for the new style.

Clicking on any thumbnail should update the main image to match that shown in the thumbnail clicked.

The thumbnail corresponding to the image currently selected as the main image should be highlighted to indicate the current selection.

Clicking on the currently selected thumbnail will have no further effect.

Up to 7  thumbnail images will be displayed at a given time in the list.

If more than 7 images are in the set for the style selected, the user should be able to scroll forward and backwards through the thumbnails.   An arrow button pointing either direction should allow the customer to scroll through the remaining thumbnails in either direction.

Customers should also be able to change to the next or previous image in the set using forward and backwards arrow buttons appearing near the right and left edges of the image, respectively.  Upon clicking the right or left arrow, the main image and the thumbnail highlighted should update.

If upon navigating to the previous or next image using the arrows, the thumbnail corresponding to the now selected image is no longer visible, then the thumbnail list should scroll similarly such that the newly selected thumbnail is visible.

If the user hovers over the main image anywhere other than the thumbnails, the left arrow, or the right arrow, the mouse icon should change to show a magnifying glass.  If the user clicks on the image, the image gallery should change to the expanded view.

If the first image is selected, the left arrow should not appear.  Similarly, if the last image is selected, the right arrow should not appear.

*Expanded View*

The expanded view of the image gallery will overlay the rest of the item detail page.   Much of the same functionality on the default view will also be available on the expanded view.

The expanded view will also primarily consist of a main image.  Unlike the default view, this main image will span the entire screen.

The main image will still offer right and left arrows, which will have the same function of scrolling through the image set.

In the expanded view, thumbnails will not appear over the main image.  Instead, icons indicating each image in the set will appear.  These icons will be much smaller, but will have the same functionality in that clicking on them will skip to that image in the set.   Additionally the icon for the currently selected. image will be distinguishably different from the rest.

In the default view, clicking on the image would open the expanded view.   In the expanded view, however, clicking on the main image will zoom the image by 2.5 times.   Instead of displaying a magnifying glass on hover, in the expanded view the mouse should become a “+” symbol while hovering over the main image.

After clicking, the zoomed image will be too large to display in the space provided.   In this case, the portion of the image shown within the window should correspond to the current mouse position relative to the screen.   For example, by moving the mouse right the portion of the zoomed image shown should pan to the right.

Furthermore, the position of the mouse relative to the centering of the zoomed image should be proportional.  If the mouse is all the way in the bottom left corner of the expanded image gallery window, the bottom left corner of the zoomed image should be displayed.   Moving the mouse to the top right should smoothly move the zoomed image available such until the top right of the image is displayed.

While the image is zoomed, no arrow buttons or thumbnail selection icons will be available.   The mouse should display as a “-” symbol.   Upon clicking the image in this state, the user should be returned to the normal expanded image gallery view.
