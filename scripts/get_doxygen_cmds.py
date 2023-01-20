"""Scraper for Doxygen Commands"""
import json

import requests
from lxml import etree

def remove_prefix(value: str) -> str:
    if len(value) != 0:
        if value[0] == "\\" or value[0] == "@":
            return value[1:]
    return value

if __name__ == "__main__":
    response = requests.get("https://www.doxygen.nl/manual/commands.html")
    if response.status_code == 200:
        content = response.text
        tree = etree.HTML(content)
        # These include a tags in the see also section, so there will be duplicate elements.
        elements = tree.xpath("//a[starts-with(@href,'commands.html')]")

        command_names = list(set([remove_prefix(element.text) for element in elements]))

        with open("doxygen_cmds.json", "w") as f:
            payload = {
                "command_names": command_names
            }
            json.dump(payload, f)
    else:
        print(f"[error] the request to Doxygen command list page result in code {response.status_code}. We are expecting to see code 200.")