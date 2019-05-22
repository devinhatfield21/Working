Function GetContentFeed() 'This function retrieves and parses the feed and stores each content item in a ContentNode
    url = CreateObject("roUrlTransfer") 'component used to transfer data to/from remote servers
    url.SetUrl("http://api.delvenetworks.com/rest/organizations/59021fabe3b645968e382ac726cd6c7b/channels/1cfd09ab38e54f48be8498e0249f5c83/media.rss")
    rsp = url.GetToString() 'convert response into a string

    responseXML = ParseXML(rsp) 'Roku includes it's own XML parsing method

    if responseXML<>invalid then  'Fall back in case Roku's built in XML Parse method fails
        responseXML = responseXML.GetChildElements() 'Access content inside Feed
        responseArray = responseXML.GetChildElements()
    End if

    'manually parse feed if ParseXML() is invalid
    result = [] 'Store all results inside an array. Each element represents a row inside our RowList stored as an Associative Array (line 63)

    for each xmlItem in responseArray 'For loop to grab content inside each item in the XML feed
        if xmlItem.getName() = "item" 'Each individual channel content is stored inside the XML header named <item>
            itemAA = xmlItem.GetChildElements() 'Get the child elements of item
            if itemAA <> invalid 'Fall back in case invalid is returned
                item = {} 'Creates an Associative Array for each row
                for each xmlItem in itemAA 'Goes through all content of itemAA
                    item[xmlItem.getName()] = xmlItem.getText()
                    if xmlItem.getName() = "media:content" 'Checks to find <media:content> header
                        item.stream = {url : xmlItem.url} 'Assigns all content inside <media:content> to the  item AA
                        item.url = xmlItem.getAttributes().url
                        item.streamFormat = "mp4"

                        mediaContent = xmlItem.GetChildElements()
                        for each mediaContentItem in mediaContent 'Looks through MediaContent to find poster images for each piece of content
                            if mediaContentItem.getName() = "media:thumbnail"
                                item.HDPosterUrl = mediaContentItem.getattributes().url 'Assigns images to item AA
                                item.hdBackgroundImageUrl = mediaContentItem.getattributes().url
                            end if
                        end for
                    end if
                end for
                result.push(item) 'Pushes each AA into the Array
            end if
        end if
    end for
    return result ' Returns the array
End Function
Sub Init()
    m.top.functionName = "loadContent"
End Sub

Sub loadContent()
    list = GetContentFeed()
    m.top.content = ParseXMLContent(list)
End Sub

Function ParseXMLContent(list As Object) 'Formats content into content nodes so they can be passed into the RowList
    RowItems = createObject("RoSGNode","ContentNode")
    'Content node format for RowList: ContentNode(RowList content) --<Children>-> ContentNodes for each row --<Children>-> ContentNodes for each item in the row)
    for each rowAA in list
        row = createObject("RoSGNode","ContentNode")
        row.Title = rowAA.Title

        for each itemAA in rowAA.ContentList
            item = createObject("RoSGNode","ContentNode")
            item.SetFields(itemAA)
            row.appendChild(item)
        end for
        RowItems.appendChild(row)
    end for
    return RowItems
End Function