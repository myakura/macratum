async function getAllTabsForTheWindow() {
	const queryOptions = { currentWindow: true };
	const tabs = await chrome.tabs.query(queryOptions);

	return tabs;
}

function getDuplicateTabIds(data) {
	const tabIds = [];
	const urlMap = new Map();

	for (const item of data) {
		if (urlMap.has(item.url)) {
			tabIds.push(item.id);
		} else {
			urlMap.set(item.url, item.id);
		}
	}

	return tabIds;
}

async function removeDuplicateTabIds() {
	const tabs = await getAllTabsForTheWindow();
	const tabIds = getDuplicateTabIds(tabs);

	return tabIds;
}

chrome.action.onClicked.addListener(async (req, sender, _) => {
	const tabIdsToRemove = await removeDuplicateTabIds();
	await chrome.tabs.remove(tabIdsToRemove);
});
