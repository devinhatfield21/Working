 Sub init()
 print "[HomeScene:::init()]"
 m.RowList = m.top.findNode("RowList")
 m.Title = m.top.findNode("Title")
 m.Description = m.top.findNode("Description")
 m.Poster = m.top.findNode("Poster")
 m.RowList.setFocus(true)
 m.LoadTask = CreateObject("roSGNode", "FeedParser") 'Create XML Parsing task node
 m.LoadTask.control = "RUN" 'Run the task node
m.LoadTask.observeField("content","rowListContentChanged")
 m.RowList.observeField("rowItemFocused", "changeContent")
 m.Video = m.top.findNode("Video")
m.videoContent = createObject("roSGNode", "ContentNode")
m.RowList.observeField("rowItemSelected", "playVideo")
 End Sub

 Sub rowListContentChanged()
  print "[rowListContentChanged()]"
    m.RowList.content = m.LoadTask.content
 end Sub

Sub changeContent()
print "[changeContent()]"
     contentItem = m.RowList.content.getChild(m.RowList.rowItemFocused[0]).getChild(m.RowList.rowItemFocused[1])
     m.top.backgroundUri = contentItem.HDPOSTERURL
     m.Poster.uri = contentItem.HDPOSTERURL
      m.Title.text = contentItem.TITLE
     m.Description.text = contentItem.DESCRIPTION
 End Sub

 Sub playVideo()
    m.videoContent.url = m.RowList.content.getChild(m.RowList.rowItemFocused[0]).getChild(m.RowList.rowItemFocused[1]).URL
    'rowItemFocused[0] is the row and rowItemFocused[1] is the item index in the row

    m.videoContent.streamFormat = "mp4"
    m.Video.content = m.videoContent
    m.Video.visible = "true"
    m.Video.control = "play"
End Sub

Function onKeyEvent(key as String, press as Boolean) as Boolean 'Maps back button to leave video
    if press
    	if key = "back" 'If the back button is pressed
		m.Video.visible = "false" 'Hide video
		m.Video.control = "stop" 'Stop video from playing
		return true
        end if
    end if
end Function